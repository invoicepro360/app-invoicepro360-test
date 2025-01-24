import { reactive, toRefs } from "vue"
import { useVuelidate } from "@vuelidate/core"
import config from "@/config"
import { useApi } from "@/compositions/api"
import { useUtils, businessTypes, companyTypes, currencies } from '@/compositions/utils'
import { AUTH_KEY, useAuth } from '@/compositions/auth'
import VALIDATE from "@/compositions/validate"

const businessUrl = config.BUSINESSES_FETCH_URL
const state = reactive({
    business_id: null,
    showLoadingIcon : false,
    validationErrors : null,
    business: {
        companyName: null,
        companyType: '',
        businessType: '',
        addressLine1: null,
        addressLine2: null,
        city: null,
        state: '',
        zipcode: null,
        country: '',
        phoneNumber: null,
        mobileNumber: null,
        fax: null,
        website: null,
    },
    businessTypes: businessTypes,
    companyTypes: companyTypes,
    currencies : currencies,
    countries: [],
    states: [],
    status : null,
    error : null,
    isSaved : false,
    alertMessage : null,
    businesses : [],  
    isBusinessLoaded : false,
})

export const fetchBusiness = () => {

    state.status = null        
    const {get, data, error,status} = useApi(config.BUSINESSES_FETCH_URL)

    get().then( () => {        
        state.status = status.value
        if(status.value === 404){
            state.error = error.value
            state.isBusinessLoaded = true
        }else{
            state.isBusinessLoaded = true
            state.businesses = data.value.data
        }
    })

    return  {
        ...toRefs(state)
    }
}

export const saveBusiness = (type = 'businesses') => {

    resetForm()

    const { countries,states,businesses,refreshAssignedBusiness } = useUtils()
    
    state.countries = countries.value
    state.states = states.value

    //validation object
    const validate = useVuelidate( 
        (type == 'modal')? VALIDATE.BusinessModal : VALIDATE.Business,state.business)

    //form submit handler
    const submit = async () => {
        
        validate.value.$touch()
        
        if (validate.value.$invalid) return

        state.showLoadingIcon = true

        const { data, post, update } = useApi(
            businessUrl + `${state.business_id ? state.business_id : "create"}`
        )

        const payload = {
            companyName: state.business.companyName,
            companyType: state.business.companyType,
            businessType: state.business.businessType,
            addressLine1: state.business.addressLine1,
            addressLine2: state.business.addressLine2,
            city: state.business.city,
            state: state.business.state,
            zipcode: state.business.zipcode,
            country: state.business.country,
            phoneNumber: state.business.phoneNumber,
            mobileNumber: state.business.mobileNumber,
            fax: state.business.fax,
            website: state.business.website,
        }

        if (state.business_id == null){
            await post(payload)
            state.alertMessage = "New business created successfully."
        }else{
            await update(payload)
           state.alertMessage = "Business has been updated successfully."
        } 

        if(data.value.validation_errors){
            state.showLoadingIcon = false
            state.validationErrors = data.value.validation_errors
            return
        }

        state.showLoadingIcon = false
        state.isSaved = true        

        if (businesses.value.length === 0) {
            // save in localstorage
            let obj = JSON.parse(window.localStorage.getItem(AUTH_KEY))

            obj.access_token = data.value.data.access_token
            obj.user.default_business_id = data.value.data.assigned_business.id
            window.localStorage.setItem(AUTH_KEY, JSON.stringify(obj))

            //set true call assigned business api again
            if(state.isSaved) refreshAssignedBusiness.value = true
            
            //update access_token and user obj            
            const { useUser } = useAuth()
                
            await useUser()

            if(type == 'dashboard'){
                await sendWelcomeEmail()
            }
        }

        if(type != 'modal') router.push({ name :type })        

    }

    const sendWelcomeEmail = async () => {
        const {post } = useApi(config.WELCOME_EMAIL_URL)
        await post({})
    }

    return {
        ...toRefs(state),
        submit,
        validate,
    }
}

export const readBusiness = async business_id => {
    const { data, get } = useApi(businessUrl + business_id)
    await get()

    return data.value.data
}

export const businessDetail = async () => {
    const { data, get } = useApi(businessUrl + 'detail')
    await get()

    return data.value.data
}

export const resetForm = () => {
    state.business_id           = null
    state.business.companyName  = ''
    state.business.companyType  = ''
    state.business.businessType = ''
    state.business.addressLine1 = ''
    state.business.addressLine2 = ''
    state.business.country      = ''
    state.business.state        = ''
    state.business.city         = ''
    state.business.zipcode      = ''
    state.business.fax          = ''
    state.business.mobileNumber = ''
    state.business.phoneNumber  = ''
    state.business.website      = ''
}