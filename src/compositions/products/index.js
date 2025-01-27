
import { ref, reactive, toRefs, createApp } from "vue"

import config from "@/config"
import { useApi } from "@/compositions/api"
import { useUtils } from "@/compositions/utils"
import { validatePermissions, getPermissionList } from "@/compositions/permissions"
import { useVuelidate } from "@vuelidate/core"
import VALIDATE from "@/compositions/validate"
import { helper as $h,stringToHTML } from "@/utils/helper"
import Menu from "@/components/ActionMenu/Menu.vue";


const holdRow = ref()
const url = config.PRODUCT_URL

const state = reactive({
    products: [],
    product_id: null,
    showLoadingIcon: false,
    validationErrors: null,
    product: {
        name: null,
        description: null,
        price: null,
        income_account_id: '',
        type: 'product',
        is_taxable: 0,
    },
    isNotify: false,
    showIncomeAcountDropdown: true,
    alertMessage: null,
    error: null,
    permissions: [],
    chartAccounts: [],
    filters: {
        field: "",
        type: "",
    },
    isDeleteModal : false
})

export const fetchProduct = () => {
    validatePermissions("product", "view");

    state.permissions = getPermissionList("product");

    // Function to fetch and update products
    const fetchProducts = async () => {
      const { data, get } = useApi(url);
      try {
        await get(); // Fetch data from API
        state.products = data.value?.data || []; // Update state with product data
        console.log("Fetched products:", state.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        state.alertMessage = "Failed to fetch products.";
        state.isNotify = true;
      }
    };

    // Function to reset filters
    const resetFilters = () => {
      state.filters.field = "";
      state.filters.type = "";
    };

    return {
      ...toRefs(state),
      fetchProducts,
      resetFilters,
    };
  };

export const saveProduct = () => {

    //validate user permission
    validatePermissions('product', `${router.currentRoute.value.name == "edit-product" ? 'edit' : 'create'}`)


    state.permissions = getPermissionList('product')

    state.showIncomeAcountDropdown = false


    // reset product form
    resetForm()

    //validation object
    const vp$ = useVuelidate(VALIDATE.Product, state.product)

    //form submit handler
    const submit = async () => {

        vp$.value.$touch()
        if (vp$.value.$invalid) return

        state.showLoadingIcon = true

        const { data, post, update } = useApi(
            url + `${state.product_id ? state.product_id : "create"}`
        )

        const payload = {
            name: state.product.name,
            description: state.product.description,
            price: state.product.price,
            is_taxable: state.product.is_taxable,
            type: state.product.type,
            income_account_id: state.product.income_account_id
        }

        if (state.product_id == null) {
            await post(payload)
            state.alertMessage = "New product added successfully"
        } else {
            await update(payload)
            state.alertMessage = "Product saved successfully"
        }

        if (data.value.validation_errors) {
            state.error = true
            state.isNotify = true
            state.showLoadingIcon = false
            state.alertMessage = "Validation Failed"

            state.validationErrors = data.value.validation_errors
            return
        } else {
            state.isNotify = true
        }

        state.showLoadingIcon = false

        return true;
    }

    const trimDescription = (event) => {
        if (state.product.description.length > 60) {
            event.preventDefault()
            state.product.description = state.product.description.substring(0, 60)
        }
    }

    return {
        ...toRefs(state),
        submit,
        trimDescription,
        vp$,
    }
}



export const readProduct = product_id => {
    const { data, get, error, status } = useApi(url + product_id)

    get().then(() => {
        if (status.value === 404 || status.value === 400) {
            state.error = true
            state.isNotify = true
            state.alertMessage = error.value.message
            router.push({ name: "product-services" })
        } else {
            let product = data.value.data
            state.product_id = product.id
            state.product.name = product.name
            state.product.price = product.price
            state.product.description = product.description.substring(0, 60)
            state.product.is_taxable = product.is_taxable
            state.product.type = product.type
            state.product.income_account_id = product.income_account_id
        }
    })
}

export const deleteProduct = () => {
    const { post, status }  = useApi(url + "update-status")
    const { initTabulator } = fetchProduct()

    // validatePermissions('product', 'delete')

    post({ id: holdRow.value.id })
        .then(() => {
            if (status.value === 404 || status.value === 400) {
                state.error = true
                state.isNotify = true
                state.isDeleteModal = false
                state.alertMessage = 'Unable to inactive product'
            } else {
                state.isNotify = true
                state.isDeleteModal = false
                state.alertMessage = "Product has been inactive."
                initTabulator()
            }
        })
}

export const exportCSV = () => {
    const { get, status, data } = useApi(url + "export-csv")

    validatePermissions('product', 'export')

    get()
        .then(() => {

            if (status.value === 404 || status.value === 400) {
                state.error = true
                state.isNotify = true
                state.alertMessage = 'Unable to export product csv'
            } else {
                let base64String = `data:application/csv;base64, ${data.value.data.base64Csv}`;

                const downloadLink = document.createElement("a");

                downloadLink.href = base64String;
                downloadLink.download = data.value.data.name;
                downloadLink.click();

                state.isNotify = true
                state.alertMessage = "Product csv exported successfully."
                // state.showLoadingIcon = false
            }

        })
}

export const resetForm = () => {
    state.product_id = null
    state.product.name = null
    state.product.price = null
    state.product.description = null
    state.product.income_account_id = '';
    state.product.type = 'product'
    state.product.is_taxable = 0
}

export const showNotification = () => {
    $h.notification(state.error, state.alertMessage, state.validationErrors)

    state.isNotify = false
    state.error = false
    state.alertMessage = null
    state.validationErrors = null
}

const showDeleteModal = data => {
    holdRow.value = data

    if(data.status == 'inactive'){
        deleteProduct()
    }else{
        state.isDeleteModal = true
    }
}

const makeDropdown = data => {
    const menuElement = stringToHTML(`<div></div>`)
    if (menuElement) {
        createApp(Menu,{
            data    : data,
            permissions: state.permissions,
            editRoute : 'edit-product'
        }).provide('showDeleteModal', showDeleteModal)
        .mount(menuElement);
    } else {
        console.error('Product Menu element not found');
    }
    return menuElement;
}