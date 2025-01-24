<template>
    <div id="set-business-modal" class="modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <div class="p-5 text-center">
                        <Lucide icon="XCircle" class="w-16 h-16 text-theme-6 mx-auto mt-3" />
                        <div class="text-3xl mt-5">Error</div>
                        <div class="text-gray-600 mt-2">
                            Unable to Set Default Business. Please try again or contact to customer Support
                        </div>
                    </div>
                    <div class="px-5 pb-8 text-center">
                        <button type="button" data-dismiss="modal" class="btn btn-outline-secondary w-24 mr-1">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
    props: {},
    methods: {},
})
</script>
