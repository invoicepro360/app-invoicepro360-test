<template>
  <Chart type="pie" :width="width" :height="height" :data="data" />
</template>

<script>
import { defineComponent, computed } from "vue";
import main from "@/compositions/main.js"

export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  setup() {

    const darkMode = computed(() => main.state.darkMode);
    const data = computed(() => {
      return {
        labels: ["Html", "Vuejs", "Laravel"],
        datasets: [
          {
            data: [15, 10, 65],
            backgroundColor: ["#FF8B26", "#FFC533", "#285FD3"],
            hoverBackgroundColor: ["#FF8B26", "#FFC533", "#285FD3"],
            borderWidth: 5,
            borderColor: darkMode.value ? "#303953" : "#fff"
          }
        ]
      };
    });

    return {
      data
    };
  }
});
</script>
