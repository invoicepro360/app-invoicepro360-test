<template>
  <div class="top-bar intro-y grid grid-cols-2 gap-4 items-center mt-5">
    <div v-if="heading">
      <h1 class="text-xl font-medium mr-auto">{{ heading }}</h1>
    </div>
    <slot name="search-form"></slot>
    <div class="flex ml-auto">
      <button v-if="canCreate" @click="$emit('create-click')" class="btn btn-primary">
        {{ createLinkText }}
      </button>
      <slot name="more-action"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: ["heading", "createLinkRoute", "createLinkText", "canCreate"],
  setup() {},
});
</script>
