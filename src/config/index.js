let BASE_URL = "http://52.41.151.33"
let APP_URL = "http://localhost:8080/"
let apiVersion = "v1";

let BUSINESS_PORT = ':3333'
let AUTH_PORT = ':3334'
let META_PORT = ':3335'
let PRODUCT_PORT = ':3336'
let CUSTOMER_PORT = ':3339'


let BUSINESS_URL = `${BASE_URL}${BUSINESS_PORT}/${apiVersion}/business/`;
let AUTH_URL = `${BASE_URL}${AUTH_PORT}/${apiVersion}/auth/`;
let META_URL = `${BASE_URL}${META_PORT}/${apiVersion}/meta/`;
let PRODUCT_URL = `${BASE_URL}${PRODUCT_PORT}/${apiVersion}/product/`;
let CUSTOMER_URL = `${BASE_URL}${CUSTOMER_PORT}/${apiVersion}/customer/`;


const config = {

    VALIDATE_AUTH_URL: AUTH_URL + "validate",
    REFRESH_TOKEN_URL: AUTH_URL + "refresh",
    USER_LOGIN_URL: AUTH_URL + "login",

    FETCH_COUNTRIES_URL: META_URL + "countries",
    FETCH_STATES_URL: META_URL + "states",
    FETCH_USER_TYPES_URL: META_URL + "usertypes",
    FETCH_ACL_URL: META_URL + "acl",
    FETCH_CURRENCIES_URL: META_URL + "currencies",

    BUSINESSES_FETCH_URL: BUSINESS_URL,
    ASSIGNED_BUSINESS_URL: BUSINESS_URL + 'assigned-business',
    SET_DEFAULT_BUSINESS_URL: BUSINESS_URL + "set-default",

    PRODUCT_URL: PRODUCT_URL,
    CUSTOMER_URL: CUSTOMER_URL,

    IS_TIP_ALLOWED: true,

    INVOICE_TEMPLATE_1: "classic",
    INVOICE_TEMPLATE_2: "professional",
    INVOICE_TEMPLATE_3: "modern",
    IS_ON_TRAIL: true,
    IS_SUBSCRIPTION_EXPIRE: false,
}

export default config
