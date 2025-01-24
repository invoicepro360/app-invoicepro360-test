import { ref, reactive, toRefs, createApp } from "vue"

import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import config from "@/config"
import { useApi,tabulatorHeader } from "@/compositions/api"
import { useUtils } from "@/compositions/utils"
import VALIDATE from "@/compositions/validate"
import {validatePermissions, getPermissionList} from "@/compositions/permissions"

import { useVuelidate } from "@vuelidate/core"
import { helper as $h,stringToHTML } from "@/utils/helper"
import Menu from "@/components/ActionMenu/Menu.vue";


const holdRow = ref()
const url = config.CUSTOMER_URL

const state = reactive({
    customer_id       : null,
    showLoadingIcon   : false,
    validationErrors  : null,
    isContactActive : true,
    isBillingActive : false,
    isShippingActive: false,
    isOtherInfoActive: false,
    isSaved : false,
    customer: {
        contact: {
            customer     : '',
            firstName    : '',
            lastName     : '',
            email        : '',
            phoneNumber  : '',
        },
        billing: {
            addressLine1: '',
            addressLine2: '',
            city    : '',
            zipCode : '',
            state   : '',
            country : '',
        },
        shipping: {
            name : '',
            phoneNumber : '',
            addressLine1: '',
            addressLine2: '',
            city    : '',
            zipCode : '',
            state   : '',
            country : '',
        },
        otherInfo: {
            accountNumber   : '',
            mobileNumber    : '',
            fax     : '',
            website : '',
        },
    sameAsBilling : false,    
    },
    countries: [],
    states: [],
    status  : null,
    error   : false,
    isNotify : false,
    alertMessage : null,
    permissions : [],
    isDeleteModal : false
})

const tableRef  = ref()
const tabulator = ref()

export const fetchCustomer = () => {

    const filter = reactive({
        field   : "name",
        type    : "like",
        value   : "",
    })

    checkPermissions('customer','view')

    const tableColumns = [
        {
            formatter: "responsiveCollapse",
            width: 40,
            minWidth: 30,
            hozAlign: "center",
            resizable: false,
            headerSort: false,
        },
        // For HTML table
        {
            title: "#",
            width: 100,
            responsive: 0,
            field: "id",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
        },
        {
            title: "NAME",
            minWidth: 200,
            responsive: 0,
            field: "name",
            hozAlign: "center",            
            vertAlign: "middle",
            print: false,
            download: false,
            cssClass : "font-medium"
        },
        {
            title: "EMAIL",
            minWidth: 200,
            field: "email",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
        },
        {
            title: "PHONE",
            minWidth: 200,
            field: "phoneNumber",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
        },
        {
            title: "STATUS",
            minWidth: 200,
            field: "status",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
                return `<div class="flex items-center lg:justify-center">
                <span class=" py-1 px-2 rounded text-xs font-medium uppercase border ${cell.getData().status == 'active'? "border-theme-9 text-theme-9" : "border-theme-6 text-theme-6"}">
                ${cell.getData().status} 
                </span></div>`
            },
        },
        {
            title: "ACTIONS",
            minWidth: 200,
            field: "actions",
            responsive: 1,
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            headerSort: false,
            formatter(cell) {    
                return makeDropdown(cell.getData())
            }
        },
        // For print format
        {
            title   : "Name",
            field   : "customer",
            visible : false,
            print   : true,
            download: false,
        },
        {
            title   : "Email",
            field   : "email",
            visible : false,
            print   : true,
            download: false,
        },
        {
            title   : "Phone",
            field   : "phoneNumber",
            visible : false,
            print   : true,
            download: true,
        },
        {
            title   : "STATUS",
            field   : "status",
            visible : false,
            print   : true,
            download: true,
            formatterPrint(cell) {
                return cell.getValue() ? "Active" : "Inactive"
            },
        },
    ]

    const tableOptions = {
        reactiveData    : true,
        ajaxFiltering   : true,
        ajaxSorting     : true,
        printAsHtml     : true,
        printStyled     : true,
        virtualDomBuffer: 1600,
        pagination      : "remote",
        paginationSize  : 10,
        paginationSizeSelector: [10, 20, 30, 40],
        layout: "fitColumns",
        responsiveLayout: "collapse",
        placeholder: "No matching records found",
        columns: tableColumns,    
        paginationDataSent: {
            page: "current",
            size: "size",
        },
        ajaxError: function(e) {
            if (e.statusText == "Unauthorized" && e.status == 401) {
                const { error, status } = useApi()
                error.value = e
                status.value = e.status
            }
        },
        ajaxURLGenerator:function(url, config, params){
    
            url = url + "?current=" + params.current +"&size="+ params.size
    
            if(params?.sorters?.length > 0 ){             
                url = url +"&order_by="+params.sorters[0]['field'] +"&order="+ params.sorters[0]['dir']
            }
    
            return url; 
        },
        ajaxResponse:function(url, params, response){        
            response.last_page = response.meta.total_pages
            return response.data; 
        }
    }

    const initTabulator = () => {
        const table = new Tabulator(tableRef.value, tableOptions)
        table.on("tableBuilt", function(){
            table.setData(url, {}, tabulatorHeader("GET"))
        });
        tabulator.value = table

        tabulator.value?.on("renderComplete", () => {
            createIcons({
              icons,
              attrs: {
                "stroke-width": 1.5,
              },
              nameAttr: "data-lucide",
            });
          });
    }

    // Redraw table onresize
    const reInitOnResizeWindow = () => {
        window.addEventListener("resize", () => {
            tabulator.value.redraw()

            createIcons({
                icons,
                attrs: {
                  "stroke-width": 1.5,
                },
                nameAttr: "data-lucide",
              });
        })
    }

    return {
        ...toRefs(state),
        tableRef,
        tabulator,
        filter,
        tableOptions,
        initTabulator,
        reInitOnResizeWindow,
    }
}

export const saveCustomer = (type = null) => {

    resetForm()

    const { countries,states } = useUtils()
        
    state.countries = countries.value
    state.states    = states.value

    //validation object    
    const validate = useVuelidate(VALIDATE.Customer, state.customer)
    const vc$ = useVuelidate(VALIDATE.Customer.contact, state.customer.contact)
    
    //form submit handler
    const submit = async () => {
        state.error = false
        if(type == 'modal'){

            vc$.value.$touch()
            if (vc$.value.$invalid) return

            state.isBillingActive = state.isShippingActive = state.isContactActive = true
            
        }else{
            validate.value.$touch()
            if (validate.value.$invalid) return            
        }

        state.showLoadingIcon = true

        const { data, post, update } = useApi(
            url + `${state.customer_id ? state.customer_id : "create"}`
        )
        
        const payload = {
            contact     : state.customer.contact,
            billing     : state.customer.billing,
            shipping    : state.customer.shipping,
            sameAsBilling : (state.customer.sameAsBilling) ? 1 :0  
        }

        if (state.customer_id == null){
            await post(payload)
            state.isNotify = true
            state.alertMessage = "New Customer added successfully"
        }else{
            await update(payload)
            state.isNotify = true
            state.alertMessage = "Customer saved successfully"
        } 

        if(data.value.validation_errors){
            state.showLoadingIcon = false
            state.isNotify = true
            state.error = true
            state.alertMessage = "Validation failed"
            state.validationErrors = data.value.validation_errors
            return
        }

        state.showLoadingIcon = false

        if(type != 'modal'){
            router.push({ name: "customers" })
        }        
    }

    const sameAsBillingAddress = () => {
        if (state.customer.sameAsBilling){
            state.customer.shipping.addressLine1 = state.customer.billing.addressLine1
            state.customer.shipping.addressLine2 = state.customer.billing.addressLine2
            state.customer.shipping.zipCode = state.customer.billing.zipCode
            state.customer.shipping.city    = state.customer.billing.city
            state.customer.shipping.country = state.customer.billing.country
            state.customer.shipping.state   = state.customer.billing.state
        } else {
            state.customer.shipping.name = ''
            state.customer.shipping.phoneNumber = ''
            state.customer.shipping.addressLine1 = ''
            state.customer.shipping.addressLine2 = ''
            state.customer.shipping.zipCode = ''
            state.customer.shipping.city    = ''
            state.customer.shipping.country = ''
            state.customer.shipping.state   = ''
        }
    }

    return {
        ...toRefs(state),
        submit,
        sameAsBillingAddress,
        validate,
        vc$,  
    }
}

export const readCustomer = customer_id => {

    const { data, get, error,status } = useApi(url + customer_id)

    get().then( () => {
        if(status.value === 404 || status.value === 400){

            state.isNotify = true
            state.error = true
            state.alertMessage = data.value.message            
            router.push({name : "customers"})
        }else{
            state.customer_id = customer_id
            state.customer.contact.customer     = data.value.data.customer
            state.customer.contact.firstName    = data.value.data.firstName
            state.customer.contact.lastName     = data.value.data.lastName
            state.customer.contact.phoneNumber  = data.value.data.phoneNumber
            state.customer.contact.mobileNumber = data.value.data.mobileNumber
            state.customer.contact.email        = data.value.data.email
            state.customer.contact.website      = data.value.data.website

            state.customer.billing.addressLine1 = data.value.data.billingAddressLine1
            state.customer.billing.addressLine2 = data.value.data.billingAddressLine2
            state.customer.billing.zipCode  = data.value.data.billingZipcode
            state.customer.billing.city     = data.value.data.billingCity
            state.customer.billing.country  = data.value.data.billingCountry
            state.customer.billing.state    = data.value.data.billingState

            state.customer.shipping.name = data.value.data.shippingName
            state.customer.shipping.phoneNumber = data.value.data.shippingPhoneNumber
            state.customer.shipping.addressLine1 = data.value.data.shippingAddressLine1
            state.customer.shipping.addressLine2 = data.value.data.shippingAddressLine2
            state.customer.shipping.zipCode = data.value.data.shippingZipcode
            state.customer.shipping.city    = data.value.data.shippingCity
            state.customer.shipping.country = data.value.data.shippingCountry
            state.customer.shipping.state   = data.value.data.shippingState
            state.customer.sameAsBilling  = (data.value.data.sameAsBilling == 1) ? true : false
        }        
    })
}

export const deleteCustomer = () => {
    const { post, status } = useApi(url + "update-status")
    const { deleteCustomer } = useCustomer()
    const { initTabulator } = fetchCustomer()

    post({ id : holdRow.value.id })
    .then(() =>{
        if(status.value === 404 || status.value === 400){
            state.error = true
            state.isNotify = true
            state.alertMessage = 'Unable to update customer status'
            state.isDeleteModal = false
        }else{
            deleteCustomer(holdRow.value.id)
            state.error = false
            state.isNotify = true
            state.alertMessage = "Customer status updated"
            state.isDeleteModal = false
            initTabulator()
        }
    })
}

export const exportCSV = () => {
    const { get, status,data } = useApi(url + "export-csv")

    validatePermissions('customer','export')
    state.showLoadingIcon = true
    state.error = false
    get()
    .then(() =>{

        if(status.value === 404 || status.value === 400){
            state.error = true
            state.isNotify = true        
            state.alertMessage = 'Unable to export Customer csv'
            state.showLoadingIcon = false
        }else{

            let base64String = `data:application/csv;base64, ${data.value.data.base64Csv}`;
    
            const downloadLink = document.createElement("a");

            downloadLink.href = base64String;
            downloadLink.download = data.value.data.name;
            downloadLink.click();

            state.showLoadingIcon = false
            state.isNotify = true
            state.alertMessage = "Customer csv exported successfully."
        }
    })
}

export const showNotification = () => {
    $h.notification(state.error,state.alertMessage,state.validationErrors)
    state.isNotify = false
    state.error = false
    state.alertMessage = null
    state.validationErrors = null
}

export  const goBack = () => {
    router.push({name : "customers"})
}

export const resetForm = () => {

    state.customer_id               = null
    state.customer.contact.customer     = ''
    state.customer.contact.firstName    = ''
    state.customer.contact.lastName     = ''
    state.customer.contact.email        = ''
    state.customer.contact.phoneNumber  = ''
    state.customer.contact.mobileNumber = ''
    state.customer.contact.website      = ''

    state.customer.billing.addressLine1 = ''
    state.customer.billing.addressLine2 = ''
    state.customer.billing.zipCode  = ''
    state.customer.billing.city     = ''
    state.customer.billing.country  = ''
    state.customer.billing.state    = ''

    state.customer.shipping.name = ''
    state.customer.shipping.phoneNumber = ''
    state.customer.shipping.addressLine1 = ''
    state.customer.shipping.addressLine2 = ''
    state.customer.shipping.zipCode = ''
    state.customer.shipping.city    = ''
    state.customer.shipping.country = ''
    state.customer.shipping.state   = ''

    state.customer.sameAsBilling   = false
}

const showDeleteModal = data => {
    holdRow.value = data

    if(data.status == 'inactive'){
       deleteCustomer()
    }else{
        state.isDeleteModal = true
    }
}

const checkPermissions = (mod, action = '') => {
    
    const notAllowedObj =  { 
        name: "dashboard",
        params: {
            showPermissionAlert: true,
            alertMessage: "", 
        },
        alertText : {
            customer : [
                "view" , "You don't have permission to access customer list.",
                "create" , "You don't have permission to add new customer.",
                "edit" , "You don't have permission to update customer.",
                "delete", "You don't have permission to delete customer."                
            ]
        }
    }
    
    const { permissionList } = useUtils()
    state.permissions = permissionList.value[mod]        

    if(action != ''){
        if(!state.permissions[action]){
            notAllowedObj.params.alertMessage = notAllowedObj.alertText[mod][action]
            router.push(notAllowedObj)   
        }
    }
}

const makeDropdown = data => {
    const menuElement = stringToHTML(`<div></div>`)
    if (menuElement) {
        createApp(Menu,{
            data    : data,
            permissions: state.permissions,
            editRoute : 'edit-customer'
        }).provide('showDeleteModal', showDeleteModal)
        .mount(menuElement);
    } else {
        console.error('Customer Menu element not found');
    }
    return menuElement;
}