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
    <div id="map-task1" style="height: 500px; margin-top: 20px"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElDatePicker } from 'element-plus'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useOceanStore } from '../stores'

export default defineComponent({
  name: 'TaskOne',
  components: { ElDatePicker },
  setup() {
    const store = useOceanStore()
    return {
      timeRange: store.timeRange,
      updateTime: (val) => {
        if (val) {
          store.updateTimeRange(val[0], val[1])
        }
      },
    }
  },
  data() {
    return {
      map: null, // 保存地图实例
    }
  },
  mounted() {
    this.map = L.map('map-task1').setView([0, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map)

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
        .addTo(this.map)
        .bindPopup(
          `频率: ${event.frequency} 次/年<br>持续时间: ${event.duration} 天<br>强度: ${event.intensity} ℃`,
        )
    })
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove() // 清理地图实例
    }
  },
})
</script>

<style>
#map-task1 {
  width: 100%;
}
</style>
