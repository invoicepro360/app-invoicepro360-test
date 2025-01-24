import { reactive, toRefs} from "vue"
import { useVuelidate } from "@vuelidate/core"
import { useApi } from "@/compositions/api"
import VALIDATE from "@/compositions/validate"
import { useUtils, resetUtils } from "@/compositions/utils"
import config from "@/config"
import cash from "cash-dom"

export const AUTH_KEY = "invoicepro_token"
export const AUTH_TOKEN = "access_token"

const state = reactive({
    isLoggedin: false,
    user: undefined,
    err: undefined,
    businesses: [],
    isBusinessLoaded: false,
    defaultBusinessId: 0,
    refreshToken : {
        expiredAt : 0,
        //refresh between 2min = 120000 to (10min = 600000, 55min = 3300000)
        refreshAt : 3300000,
        refreshEnd : 120000,

    }
})

export const retriveToken = () => {

    const obj = JSON.parse(window.localStorage.getItem(AUTH_KEY))

    if (obj) {

        return (obj.hasOwnProperty('access_token')) ? `Bearer ${obj.access_token}` : undefined

    } else {
        return ''
    }

}

export const refreshToken = async () => {

    const obj = JSON.parse(window.localStorage.getItem(AUTH_KEY))

    if (obj) {

        const { data, error, post } = useApi(config.REFRESH_TOKEN_URL)

        let currentTime = new Date(new Date().getTime());
        let remainingTime =  state.refreshToken.expiredAt - currentTime.getTime()

        //remaining time between 2 to 10min then refresh token
        //remaining time minus means visitor was inactive or not using web app  

        // if(remainingTime < state.refreshToken.refreshAt && remainingTime > state.refreshToken.refreshAt ){            
        //     await post({ access_token: obj.access_token})            
        // }

        if(remainingTime < state.refreshToken.refreshAt  ){            

            // console.log("Refresh token remaining time:" + remainingTime)

            await post({ access_token: obj.access_token})    
            
            if (data.value.status === 200) {
 
                // save in localstorage
                let obj = JSON.parse(window.localStorage.getItem(AUTH_KEY))
    
                obj.access_token = data.value.data.access_token
                obj.expiresAt = data.value.data.expiresAt
                window.localStorage.setItem(AUTH_KEY, JSON.stringify(obj))

                state.refreshToken.expiredAt = obj.expiresAt  * 1000
            }
        }
        // else if(remainingTime < 0 ){

        //     // due to inactive visitor refresh token api wasn't call before token expire
        //     // hit refresh token api for 401 error 
        //     // useApi() will catch 401 and logout the session.
        //     await post({ access_token: obj.access_token})
        // }

    }    
}

export const useAuth = () => {

    const logout = (isRedirect = true) => {
        window.localStorage.removeItem(AUTH_KEY)
        state.user = undefined
        state.err = undefined
        state.isLoggedin = false

        resetUtils()

        //don't redirect if page is login or user invitation login
        if ( isRedirect && 
            ( router.currentRoute.value.name != 'invite-user-login' &&
                router.currentRoute.value.name != 'login')
        ) {
            cash(".dropdown-menu").remove()

            return router.push({ name: "login" })
        }
    }

    const setUser = async payload => {

        window.localStorage.setItem(AUTH_KEY, JSON.stringify(payload))
        state.user = payload.user
        state.refreshToken.expiredAt = payload.expiresAt * 1000
        state.defaultBusinessId = payload.user.default_business_id
        state.err = undefined
        state.isLoggedin = true

    }

    const setDefaultBusiness = (businessId) => {

        const { data, post } = useApi(config.SET_DEFAULT_BUSINESS_URL)

        const payload = {
            id: businessId,
        }

        post(payload).then(() => {

            if (data.value.status === 200) {


                let obj = JSON.parse(window.localStorage.getItem(AUTH_KEY))

                obj.access_token = data.value.data.access_token
                obj.user.default_business_id = businessId

                window.localStorage.setItem(AUTH_KEY, JSON.stringify(obj))

                window.location.reload()

            } else {
                cash("#set-business-modal").modal('show')
            }
        })
    }

    const useUser = async () => {
        // Read access token from local storage?
        const _token = retriveToken()

        if (_token) {

            const { data, error, post } = useApi(config.VALIDATE_AUTH_URL)
            const { initialize, isSetup } = useUtils()

            const payload = {
                access_token: _token.replace("Bearer ", ""),
            }

            await post(payload)

            if (data.value.status == 401 || error.value) {

                state.user = null
                state.isLoggedin = false
                window.localStorage.removeItem(AUTH_KEY)

                cash(".dropdown-menu").remove()
                // cash('.modal').remove()
            } else {
                let obj = JSON.parse(window.localStorage.getItem(AUTH_KEY))
                state.user = obj.user
                state.refreshToken.expiredAt = obj.expiresAt * 1000
                state.isLoggedin = true
                state.defaultBusinessId = obj.user.default_business_id

                state.user.isValidMfa = data.value.data.isValidMfa
            }

            if (state.isLoggedin && state.user.isValidMfa &&
                (window.location.pathname != '/multifactor-authentication' &&
                    window.location.pathname != '/dashboard'    
                )
            ) {
                if(!isSetup.value) initialize('useUser')
            }
        }
    }

    return {
        ...toRefs(state),
        setUser,
        logout,
        refreshToken,
        useUser,
        setDefaultBusiness
    }
}


export const login = (token = '') => {

    const state = reactive({
        formData: {
            username: null,
            password: null,
        },
        invalidUserMessage: null,
        isInvalidUser: false,
        passwordType: "password",
        showLoadingIcon: false,
    })

    //validation object
    const validate = useVuelidate(VALIDATE.Login, state.formData)

    const submit = () => {

        validate.value.$touch()

        if (validate.value.$invalid) return

        state.showLoadingIcon = true

        let LOGIN_URL = config.USER_LOGIN_URL
        let payload = {
            username: state.formData.username,
            password: state.formData.password,
        }

        if (token) {
            LOGIN_URL = config.INVITATION_LOGIN_URL
            payload = {
                username: state.formData.username,
                password: state.formData.password,
                token: token,
            }
        }

        const { loading, data, post, errorMessage, isConnectionFail } = useApi(LOGIN_URL)
        const { setUser } = useAuth()

        post(payload).then(() => {
            if(isConnectionFail.value || errorMessage.value){
                state.isInvalidUser = true
                state.invalidUserMessage = (errorMessage.value == 'Unauthorized') 
                                            ? data.value.error 
                                            : errorMessage.value
                
            } else {
                setUser(data.value.data)               
                router.push({ name: 'dashboard' })            
            }

            state.showLoadingIcon = false
        })

    }

    const switchVisibility = () => state.passwordType = state.passwordType === "password" ? "text" : "password"

    return {
        ...toRefs(state),
        submit,
        validate,
        switchVisibility,
    }
}