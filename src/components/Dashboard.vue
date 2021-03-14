<template>
  <div>
    <BarChart></BarChart>

    <line-chart></line-chart>
  </div>
</template>

<script>
import BarChart from "./BarChart.vue";
import LineChart from "./CallAPI.vue"
export default {
  components: {
    BarChart,
    LineChart
  }
};
</script>

<style>
</style>