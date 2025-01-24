
import { ref, reactive, toRefs, createApp } from "vue"

import { TabulatorFull as Tabulator } from "tabulator-tables";
import config from "@/config"
import { useApi, tabulatorHeader } from "@/compositions/api"
import { useUtils } from "@/compositions/utils"
import { validatePermissions, getPermissionList } from "@/compositions/permissions"
import { useVuelidate } from "@vuelidate/core"
import VALIDATE from "@/compositions/validate"
import { helper as $h,stringToHTML } from "@/utils/helper"
import tippy from "tippy.js";
import Menu from "@/components/ActionMenu/Menu.vue";


const holdRow = ref()
const url = config.PRODUCT_URL

const state = reactive({
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

const products = ref([]);

const fetchProductData = async () => {
  const { data, get } = useApi(config.PRODUCT_URL);

  //console.log("Fetching data from API...");
  await get(); // Wait for the API call to complete
  //console.log("API response:", data.value); // Debug the API response

  // Assign fetched data to products
  products.value = data.value?.data || [];
  //console.log("Updated products ref:", products.value); // Debug after updating

  return {
    products,
  };
};

export { products, fetchProductData };

export const fetchProduct = () => {

    validatePermissions('product', 'view')

    state.permissions = getPermissionList('product')

    const tableRef = ref()
    const tabulator = ref()

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
            title: "NAME",
            minWidth: 200,
            responsive: 1,
            field: "name",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
                return `<div class="font-medium whitespace-nowrap">${cell.getData().name}</div>`
            },
        },
        {
            title: "PRICE",
            minWidth: 200,
            responsive: 1,
            field: "price",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
                return `<div class="flex lg:justify-center">$${cell.getData().price}</div>`
            },
        },
        {
            title: "DESCRIPTON",
            minWidth: 200,
            responsive: 1,
            field: "description",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            cellMouseEnter: function(e, cell, row) {
            
                var celldata = cell.getElement(); 
                if (!celldata._tippy) {
                    tippy(celldata, {
                        content: `${cell.getData().description}`, maxWidth: "450px", arrow: true,
                    })
                }
                 celldata._tippy.show();
            },
            formatter(cell) {
                
                return `<div class="flex lg:justify-center">${cell.getData().description.substring(0, 20)}...</div>`
            }
        },
        {
            title: "TYPE",
            minWidth: 100,
            responsive: 1,
            field: "type",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
        },
        {
            title: "STATUS",
            minWidth: 50,
            responsive: 1,
            field: "status",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
                return `<div class="flex items-center lg:justify-center">
                <span class=" py-1 px-2 rounded text-xs font-medium uppercase border ${cell.getData().status == 'active' ? "border-theme-9 text-theme-9" : "border-theme-6 text-theme-6"}">
                ${cell.getData().status} 
                </span></div>`
            },
        },
        {
            title: "ACTIONS",
            minWidth: 100,
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
            title: "NAME",
            field: "name",
            visible: false,
            print: true,
            download: true,
        },
        {
            title: "PRICE",
            field: "price",
            visible: false,
            print: true,
            download: true,
        },
    ]

    const tableOptions = {
        reactiveData: true,
        ajaxFiltering: true,
        ajaxSorting: true,
        printAsHtml: true,
        printStyled: true,
        pagination: "remote",
        paginationSize: 10,
        paginationSizeSelector: [10, 20, 30, 40],
        layout: "fitColumns",
        responsiveLayout: "collapse",
        placeholder: "No matching records found",
        columns: tableColumns,
        paginationDataSent: {
            page: "current",
            size: "size",
        },
        ajaxError: function (e) {
            if (e.statusText == "Unauthorized" && e.status == 401) {
                const { error, status } = useApi()
                error.value = e
                status.value = e.status
            }
        },
        ajaxURLGenerator: function (url, config, params) {

            url = url + "?current=" + params.current ?? 1 + "&size=" + params.size ?? 10
            if (params?.sorters?.length > 0) {
                url = `${url}&order_by=${params.sorters[0]['field']}&order=${params.sorters[0]['dir']}`
            }

            if (params?.filters?.length > 0) {
                url = url + `&search=${state.filters.field}&type=${state.filters.type}`
            }

            return url;
        },
        ajaxResponse: function (url, params, response) {
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
    }

    // Redraw table onresize
    const reInitOnResizeWindow = () => {
        window.addEventListener("resize", () => {
            tabulator.value.redraw()
        })
    }

    return {
        ...toRefs(state),
        tableRef,
        tabulator,
        tableOptions,
        initTabulator,
        reInitOnResizeWindow,
    }
}

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

        router.push({ name: "product-services" })
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