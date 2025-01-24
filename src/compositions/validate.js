import { 
    required, 
    maxLength,
    helpers 
} from "@vuelidate/validators"

const Login = {
    username: { 
        required: helpers.withMessage('Username is required',required)
    },
    password: { 
        required: helpers.withMessage('Password is required',required) 
    },
}


const Customer = {
    contact: {
        customer: { required },
        // mobileNumber: { required },
        // email: { required, email },
    },
    billing: {
        // addressLine1: { required },
        // city: { required },
        // state: { required },
        // zipCode: { required },
        // country: { required },
    },
    shipping: {
        // addressLine1: { required },
        // city: { required },
        // state: { required },
        // zipCode: { required },
        // country: { required },
    },
   
}

const Product = {
    name: { required },
    price: { required },
    description : { 
        maxLength : maxLength(60),
    },
}


const VALIDATE = {
    Login,
    Customer,
    Product,

}

export default VALIDATE