<script setup lang="ts">
import { computed } from "vue";
import { type ChartData, type ChartOptions } from "chart.js/auto";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { useDarkModeStore } from "@/stores/dark-mode";
import { getColor } from "@/utils/colors";

const props = defineProps<{
  width?: number;
  height?: number;
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

const chartData = [15, 10, 65];
const chartColors = () => [
  getColor("pending", 0.9),
  getColor("warning", 0.9),
  getColor("primary", 0.9),
];
const data = computed<ChartData>(() => {
  return {
    labels: ["Yellow", "Dark"],
    datasets: [
      {
        data: chartData,
        backgroundColor: colorScheme.value ? chartColors() : "",
        hoverBackgroundColor: colorScheme.value ? chartColors() : "",
        borderWidth: 5,
        borderColor: darkMode.value
          ? getColor("darkmode.700")
          : getColor("slate.200"),
      },
    ],
  };
});

const options = computed<ChartOptions>(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "82%",
  };
});
</script>

<template>
  <Chart
    type="doughnut"
    :width="props.width"
    :height="props.height"
    :data="data"
    :options="options"
  />
</template>
