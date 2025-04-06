<template>
  <div>
    <h2>海洋热浪与多变量因素关联分析</h2>
    <!-- 变量选择下拉框 -->
    <el-select v-model="selectedVariable" placeholder="选择变量" @change="fetchData">
      <el-option label="海表温度 (SST)" value="sst" />
      <el-option label="盐度" value="salinity" />
      <el-option label="风场" value="wind" />
    </el-select>
    <!-- 地图容器 -->
    <div id="map" style="height: 500px; margin-top: 20px"></div>
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
    }
  },
  mounted() {
    const map = L.map('map').setView([0, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    // 示例：根据变量添加标记
    this.fetchData()
  },
  methods: {
    fetchData() {
      // 模拟数据
      const map = document.getElementById('map')._leaflet_map
      map.eachLayer((layer) => {
        if (layer instanceof L.Circle) map.removeLayer(layer)
      })
      if (this.selectedVariable === 'sst') {
        L.circle([30, 150], { radius: 300000, color: 'blue' }).addTo(map).bindPopup('SST 相关区域')
      }
    },
  },
})
</script>

<style>
#map {
  width: 100%;
}
</style>
