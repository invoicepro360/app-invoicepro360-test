<template>

<!-- BEGIN: Modal Content -->
<Dialog :open="isOpen">
  <Dialog.Panel>
      <div class="p-5 text-center">
          <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
          <div class="text-3xl mt-5" v-if="!heading">Are you sure?</div>
          <div class="text-3xl mt-5" v-if="heading">{{ heading }}</div>
        
          <div class="text-gray-600 mt-2" v-if="!message">
            Do you really want to inactive these records?
            <br />This process cannot be undone.
          </div>
          <div class="text-gray-600 mt-2" v-if="message" v-html="message"></div>

      </div>
      <div class="px-5 pb-8 text-center">
          <Button type="button" variant="outline-secondary" class="w-24 mr-2" @click="$emit('close')">
              Cancel
          </Button>
          <Button type="button" variant="danger" ref="{deleteButtonRef}" @click="$emit('delete')">
            {{ btnText ? btnText : "Delete" }}
          </Button>
      </div>
  </Dialog.Panel>
</Dialog>
<!-- END: Modal Content -->

</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import  Dialog  from "@/components/Headless/Dialog";
import Button from "@/components/Button";

const props = defineProps(["heading", "message", "btnText","isOpen"])
const emit = defineEmits(['delete', 'close'])

const heading = ref(props.heading);
const message = ref(props.message);
const isOpen = ref(props.isOpen)

watchEffect(() => {
  message.value = props.message;
  heading.value = props.heading
  isOpen.value = props.isOpen
  }
);

</script>
