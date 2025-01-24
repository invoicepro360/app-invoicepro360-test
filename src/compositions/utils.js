import { reactive, toRefs, watchEffect } from "vue"
import { useApi } from "@/compositions/api"
import { useAuth } from "@/compositions/auth";

import config from "@/config"

const state = reactive({
    menuItems       : [],
    countries       : [],
    states          : [],
    userTypes       : [],
    currencies      : [],
    permissionList  : [],
    businesses      : [],
    currentBusinessName : '',
    settings         : [],
    chartAccounts : [],
    isSetup         : false,
    isMenuLoaded    : false,
    isCountryLoaded : false, 
    isStatesLoaded  : false, 
    isUserTypesLoaded  : false, 
    isCurrencyLoaded  : false, 
    isPermissionLoaded  : false, 
    isBusinessLoaded : false,
    dateFormat : "YYYY-MMM-DD",
    currency : "USD",
    currencySymbol : "$",
    refreshAssignedBusiness : false,
    
})

export const businessTypes = [
    {
        label : 'Select Business Type',
        value : ''
    },
    {
        label : "Artists, Photographers & Creative Types",
        value : "atrists_photographers_creative"
    },
    {
        label : "Consultants & Professionals",
        value : "consultants_professionals"
    },
    {
        label : "Financial Services",
        value : "finance_insurance"
    },
    {
        label : "General: I make or sell a PRODUCT",
        value : "product_provider"
    },
    {
        label: "General: I provide a SERVICE",
        value : "service_provider"
    },
    {
        label: "Hair, Spa & Aesthetics",
        value : "hair_spa_aesthetics"
    },
    {
        label: "Medical, Dental, Health",
        value : "medical_dental_health_service"
    },
    {
        label: "Non-profits, Associations & Groups",
        value : "nonprofit_associations_groups"
    },
    {
        label: "Real Estate, Construction & Home Improvement",
        value : "realestate_home"
    },
    {
        label: "Retailers, Resellers & Sales",
        value : "retailers_and_resellers"
    },
    {
        label: "Web, Tech & Media",
        value : "web_media_freelancer"
    },    
]

export const companyTypes = [
    {
        label : 'Select Company Type',
        value : ''
    },
    {
        label : 'Sole Proprietorship',
        value : 'soleproprietorship'
    },
    {
        label : 'Partnership',
        value : 'partnership'
    },
    {
        label : 'Corporation',
        value : 'corporation'
    }
]

export const currencies = [
    {
        label : 'U.S. dollar',
        value : 'USD'
    },
    {
        label : 'Canadian dollar',
        value : 'CAD'
    }
]

export const useUtils = () => {

    const initialize = (invokedFrom = 'dashboard') => {

        // console.log(`Initialize from: ${invokedFrom}`)

        AssignedBusiness(true)
        fetchAcl()        
        fetchCountries()
        fetchStates()
        fetchCurrencies()
        fetchUerTypes()

        watchEffect(() => {

            if(
                state.isMenuLoaded && 
                state.isCountryLoaded && 
                state.isStatesLoaded && 
                state.isUserTypesLoaded && 
                state.isCurrencyLoaded &&
                state.isPermissionLoaded && 
                state.isBusinessLoaded
            ) {
                state.isSetup = true            

                const { defaultBusinessId } = useAuth();

                let b = state.businesses.find((x) => x.id === defaultBusinessId.value);
                state.currentBusinessName =  b?.companyName;                 
            }   

        })
    }


    const fetchCountries = () => {
        const { data, get,status } = useApi(config.FETCH_COUNTRIES_URL)

        get().then( () => {
            if(status.value != 404) state.countries = data.value.data            
            state.isCountryLoaded = true
        })

    }

    const fetchStates = () => {
        const { data, get,status } = useApi(config.FETCH_STATES_URL)
        
        get().then( () => {            
            if(status.value != 404 && status.value != 400){
                state.states = data.value.data ?? []
            }
        })
        state.isStatesLoaded = true

    }

    const AssignedBusiness = (validateonBoardingRedirect = true) => {
        const {get, data, error,status} = useApi(config.ASSIGNED_BUSINESS_URL)
    
        get().then( () => {            
            if(status.value === 404 || status.value === 400){   
                state.isBusinessLoaded = true
                state.businesses = []
            }else{
                state.isBusinessLoaded = true
                if(data.value.data) state.businesses = data.value.data                
            }
            // After assigned business api set to false and default would be false            
            state.refreshAssignedBusiness = false
        })
    }

    const fetchCurrencies = () => {
        const { data, get, status } = useApi(config.FETCH_CURRENCIES_URL)

        get().then( () => {
            if(status.value != 404) state.currencies = data.value.data
            state.isCurrencyLoaded = true
        })        
    }

    const fetchUerTypes = () => {
        const { data, get } = useApi(config.FETCH_USER_TYPES_URL)
        state.isUserTypesLoaded = true
    }

    const fetchAcl = () => {
        const { data, get,status } = useApi(config.FETCH_ACL_URL)    

        get().then( () => {
            if(status.value != 404) {
                state.menuItems = data.value.data.menu
                console.log(state.menuItems);
                state.permissionList = data.value.data.permissions
            }         
            state.isMenuLoaded = true
            state.isPermissionLoaded = true
        })
    }    

    const hideIntuitAlert = () => {
        return (state.isHideIntuitAlert) ? state.isHideIntuitAlert = false : state.isHideIntuitAlert = true
    }

    watchEffect(()=>{
        if(state.refreshAssignedBusiness){
            AssignedBusiness(false)
        }
    })


    return {
        ...toRefs(state),
        fetchCountries,
        fetchStates,
        fetchUerTypes,
        fetchAcl,
        hideIntuitAlert,
        initialize
    }
}

export const resetUtils = () => {

    state.menuItems = []
    state.countries = []
    state.states    = [] 
    state.userTypes = []
    state.currencies= []
    state.businesses= []
    state.permissionList = []

    state.isSetup          = false   
    state.isMenuLoaded     = false
    state.isCountryLoaded  = false 
    state.isStatesLoaded   = false 
    state.isUserTypesLoaded= false 
    state.isCurrencyLoaded = false 
    state.isBusinessLoaded = false
    state.isPermissionLoaded  = false 
}


