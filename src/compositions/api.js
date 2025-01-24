import { computed, ref, watch } from "vue"
import { useAuth, retriveToken } from "./auth"

export const tabulatorHeader = _method => {
    return {
        method: _method,
        headers: {            
            "Content-Type": "application/json",            
            Authorization: retriveToken(),
        },
        body: null,
    }
}

export const useApi = (endpoint,timeoutSeconds = 0) => {

    const requestOptions = {
        signal : null,
        method: "GET",
        headers: {
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
            Authorization: retriveToken(),
        },
        body: null,
    }

    const data      = ref()
    const loading   = ref(false)
    const error     = ref()
    const status    = ref()
    const isConnectionFail = ref(false)
    const isTimeout = ref(false)

    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, timeoutSeconds); // will time out after 5000ms

    const api = async (endpoint, type, postData = null,isUpload = false) => {
        requestOptions.method = type

        if (postData != null) requestOptions.body = JSON.stringify(postData)

        if (postData != null && isUpload) requestOptions.body = postData

        if (timeoutSeconds > 0) requestOptions.signal = controller.signal


        let response = null
        try {

            response = await fetch(endpoint, requestOptions)
            status.value = response?.status   
        

            if (status.value == 401) {
                 throw new Error("Unauthorized")
            }else if(status.value === 404){
                throw new Error("Invalid endpoint")

            }else if (status.value !== 200) {
                // if (type == "DELETE") throw new Error("Unable to delete record")
                // if (type == "GET") throw new Error("Unable to fetch records")
                // if (type == "POST") throw new Error("Unable to save record")
                // if (type == "PUT") throw new Error("Unable to save record")
            }
        } catch (e) {
        
            if(e.name === "AbortError"){
                isTimeout.value = true                
                error.value = "Request Timeout" 

                console.log(error.value)
                return
                
            }else if(status.value === undefined){
                isConnectionFail.value = true
                e.message = "Connection Failure"                
            }

            error.value = e

        }

        const data = await response?.json()

        return data

        
    }

    // connection failure email to admin.

    const post = (payload,isUpload = false) => {
        loading.value = true
        error.value = undefined
        isTimeout.value  = false

        return api(endpoint, "POST", payload,isUpload)
            .then(res => (data.value = res))
            .catch(e => {
                error.value = e
                throw e
            })
            .finally(() => {
                loading.value = false
                if(timeoutSeconds > 0) clearTimeout(timeout);                    
            })
    }

    const update = payload => {
        loading.value = true
        error.value = undefined
        isTimeout.value  = false

        return api(endpoint, "PUT", payload)
            .then(res => (data.value = res))
            .catch(e => {
                error.value = e
                throw e
            })
            .finally(() => (loading.value = false))
    }

    const get = query => {
        loading.value = true
        error.value = undefined
        isTimeout.value  = false

        let queryString = ""

        if (query) {
            queryString =
                "?" +
                Object.entries(query)
                    .map(
                        ([key, value]) =>
                            `${encodeURIComponent(key)}=${encodeURIComponent(
                                value
                            )}`
                    )
                    .join("&")
        }

        return api(endpoint + queryString, "GET")
            .then(res => {
                data.value = res
            })
            .catch(e => {
                error.value = e

                throw e
            })
            .finally(() => (loading.value = false))
    }

    const del = async (payload = []) => {
        loading.value = true
        error.value = undefined
        isTimeout.value  = false

        return await api(endpoint, "DELETE",payload)
            .then(res => (data.value = res.data))
            .catch(e => {
                error.value = e

                throw e
            })
            .finally(() => (loading.value = false))
    }

    const errorMessage = computed(() => {
        if (error.value) {
            return error.value.message
        }
        return null
    })

    const errorDetails = computed(() => {
        if (error.value && error.value.response) {
            return error.value.response.data.message
        }
        return null
    })

    const errorFields = computed(() => {
        if (error.value && Array.isArray(error.value.response.data.message)) {
            return error.value.response.data.message.reduce((acc, msg) => {
                let [field] = msg.split(" ")

                // TODO: Maximal...
                if (field == "maximal") field = "dateOfBirth"

                if (!acc[field]) {
                    acc[field] = []
                }

                acc[field].push(msg)

                return acc
            }, {})
        }
        return null
    })

    const computedClasses = key => {
        if (errorFields.value?.hasOwnProperty(key)) {
            return ["border-red-600", "bg-red-200", "text-red-900"]
        }
        return ["border-grey-600", "bg-white", "text-gray-900"]
    }

    watch([error, status], () => {
        if (
            (error.value?.message === "Unauthorized" ||
                error.value?.statusText === "Unauthorized") &&
            status.value == 401
        ) {
            const { logout } = useAuth()
            logout()
        }
    })

    return {
        isConnectionFail,
        isTimeout,
        loading,
        data,
        error,
        status,
        get,
        post,
        del,
        update,
        errorMessage,
        errorDetails,
        errorFields,
        computedClasses,
    }
}
