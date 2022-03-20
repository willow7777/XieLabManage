<template>
  <div>
    <Tabs type="card">
      <TabPane label="趋势预测">
        <div class="line-container">
          <flight-mistake-chart></flight-mistake-chart>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import flightMistakeChart from "../charts/flightMistakeChart";
export default {
  name: "flightAnalysis",
  components:{
    flightMistakeChart
  }
}
</script>

<style scoped>

</style>
