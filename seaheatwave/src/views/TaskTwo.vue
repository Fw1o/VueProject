<template>
  <div>
    <h2>海洋热浪与多变量因素关联分析</h2>
    <el-select v-model="selectedVariable" placeholder="选择变量" @change="fetchData">
      <el-option label="海表温度 (SST)" value="sst" />
      <el-option label="盐度" value="salinity" />
      <el-option label="风场" value="wind" />
    </el-select>
    <div id="map-task2" style="height: 500px; margin-top: 20px"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default defineComponent({
  name: 'TaskTwo',
  components: { ElSelect, ElOption },
  data() {
    return {
      selectedVariable: 'sst',
      map: null,
    }
  },
  mounted() {
    // 定义世界地图的最大边界
    const worldBounds = L.latLngBounds(
      L.latLng(-90, -180), // 南西角
      L.latLng(90, 180), // 北东角
    )

    // 初始化地图，设置 maxBounds 和初始缩放
    this.map = L.map('map-task2', {
      maxBounds: worldBounds, // 限制拖动范围
      maxBoundsViscosity: 1.0, // 边界弹性（1.0 表示完全固定）
      worldCopyJump: false, // 禁用跨世界跳转
      minZoom: 2, // 最小缩放级别，确保显示完整世界
      maxZoom: 18, // 最大缩放级别
    }).setView([0, 0], 2)

    // 添加瓦片层，禁用 wrap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      noWrap: true, // 禁用经度方向的瓦片重复
      bounds: worldBounds, // 限制瓦片加载范围
    }).addTo(this.map)

    this.fetchData()
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove()
    }
  },
  methods: {
    fetchData() {
      // 清除之前的圆圈
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Circle) {
          this.map.removeLayer(layer)
        }
      })

      // 根据变量添加新标记
      if (this.selectedVariable === 'sst') {
        L.circle([30, 150], { radius: 300000, color: 'blue' })
          .addTo(this.map)
          .bindPopup('SST 相关区域')
      } else if (this.selectedVariable === 'salinity') {
        L.circle([10, 100], { radius: 400000, color: 'green' })
          .addTo(this.map)
          .bindPopup('盐度相关区域')
      } else if (this.selectedVariable === 'wind') {
        L.circle([-40, 130], { radius: 350000, color: 'purple' })
          .addTo(this.map)
          .bindPopup('风场相关区域')
      }
    },
  },
})
</script>

<style>
#map-task2 {
  width: 100%;
}
</style>
