import { useUtils } from "@/compositions/utils"

const notAllowedObj =  { 
    name: "dashboard",
    params: {
        showPermissionAlert: true,
        alertMessage: "", 
    },

    alertText : {
        customer : [
            "view" , "You don't have permission to view customer list.",
            "create" , "You don't have permission to create customer.",
            "edit" , "You don't have permission to update customer.",
            "delete", "You don't have permission to delete customer."                
        ],
        product : [
            "view" , "You don't have permission to view product list.",
            "create" , "You don't have permission to create product.",
            "edit" , "You don't have permission to update product.",
            "delete", "You don't have permission to delete product."                
        ],
        invoice : [
            "view" , "You don't have permission to view invoice list.",
            "create" , "You don't have permission to create invoice.",
            "edit" , "You don't have permission to update invoice.",
            "delete", "You don't have permission to delete invoice."                
        ],
        salestax : [
            "view" , "You don't have permission to view sales tax list.",
            "create" , "You don't have permission to create sales tax.",
            "edit" , "You don't have permission to update sales tax.",
            "delete", "You don't have permission to delete sales tax."                
        ]
    }
}

export const validatePermissions = (mod, action = '') => {
        
    const { permissionList } = useUtils()
    const permissions = permissionList.value[mod]    

    if(action != ''){
        if(!permissions[action]){
            notAllowedObj.params.alertMessage = notAllowedObj.alertText[mod][action]
            router.push(notAllowedObj)   
        }
    }
}

export const getPermissionList = (mod) => {
        
    const { permissionList } = useUtils()
    
    return permissionList.value[mod] ?? []   
    
}

