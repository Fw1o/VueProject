<template>
  <div>
    <h2>海洋热浪时空分布特征分析</h2>
    <el-date-picker
      v-model="timeRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="updateTime"
    />
    <div id="map" style="height: 500px; margin-top: 20px"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElDatePicker } from 'element-plus'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useOceanStore } from '../stores' // 更新导入

export default defineComponent({
  name: 'TaskOne',
  components: { ElDatePicker },
  setup() {
    const store = useOceanStore() // 更新为 useOceanStore
    return {
      timeRange: store.timeRange,
      updateTime: (val) => {
        if (val) {
          store.updateTimeRange(val[0], val[1])
        }
      },
    }
  },
  mounted() {
    const map = L.map('map').setView([0, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    // 测试数据
    const heatwaveData = [
      { lat: 20, lon: 120, frequency: 5, duration: 10, intensity: 2.5 },
      { lat: -30, lon: 150, frequency: 3, duration: 15, intensity: 3.0 },
      { lat: 40, lon: -70, frequency: 4, duration: 8, intensity: 1.8 },
      { lat: -10, lon: 90, frequency: 6, duration: 12, intensity: 2.0 },
      { lat: 50, lon: 0, frequency: 2, duration: 20, intensity: 2.2 },
    ]

    heatwaveData.forEach((event) => {
      L.circle([event.lat, event.lon], {
        radius: event.intensity * 200000,
        color: 'red',
        fillOpacity: 0.5,
      })
        .addTo(map)
        .bindPopup(
          `频率: ${event.frequency} 次/年<br>持续时间: ${event.duration} 天<br>强度: ${event.intensity} ℃`,
        )
    })
  },
})
</script>

<style>
#map {
  width: 100%;
}
</style>
