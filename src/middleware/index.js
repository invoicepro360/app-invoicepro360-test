import { useAuth } from "@/compositions/auth"
import cash from "cash-dom"
import config from "@/config"

const { user, useUser, refreshToken, isLoggedin, logout } = useAuth()

export const alreadyLoggedinGuard = async (to, from, next) => {
    if (!isLoggedin.value && !user.value) {        
        await useUser()        
    }else if(to.name === 'onboarding'){
        await useUser()
    }
    
    if (isLoggedin.value && user.value) {

        if(!user.value.isValidMfa && to.name === 'login'){
            next(user.value.default_business_id+"/multifactor-authentication")

        }else if(to.name != 'onboarding') {
            next(user.value.default_business_id+"/dashboard")

        }else{
            next()
        }    

    }if (!isLoggedin.value && !user.value && to.name === 'onboarding') {
           next('/login') 
    } else {
        next()
    }
}

export const authGuard = async (to, from, next) => {
    cash(".toastify").each((index, item) => {
        cash(item).remove();
    });

    if (!isLoggedin.value && !user.value) {
        await useUser();
    }

    if (isLoggedin.value && user.value) {
        // Subscription expired or inactive, redirect to subscription page
        if (config.IS_SUBSCRIPTION_EXPIRE || config.IS_ON_TRAIL) {
            if (to.name !== 'subscription') {
                next('/subscription'); // Redirect to the subscription page
            } else {
                next();
            }
        } else {
            // Refresh token logic and proceed to appropriate page
            refreshToken();
            if (to.name !== 'multifactor-authentication' && !user.value.isValidMfa) {
                next("/multifactor-authentication");
            } else if (user.value.isValidMfa && to.name === 'multifactor-authentication') {
                next("/dashboard");
            } else {
                next();
            }
        }
    } else {
        next("/login");
    }
};

export const userInvitationGuard = (to, from, next) => {
 
    logout(false)

    next()
    
}