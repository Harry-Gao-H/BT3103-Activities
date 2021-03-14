<template>
  <div class="chart">
    <h1>Line Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./CallAPI.js";
export default {
  components: {
    Chart
  }
};
</script>

<style scoped>
h1 {
  background-color: #1d8ba7;
  color : white;
  text-align: center;
  width: 50%;
  margin: auto;
}
</style>