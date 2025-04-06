<template>
  <div>
    <h2>海洋热浪时空分布特征分析</h2>
    <!-- 时间范围选择器 -->
    <el-date-picker
      v-model="timeRange"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="updateTime"
    />
    <!-- 地图容器 -->
    <div id="map" style="height: 500px; margin-top: 20px"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElDatePicker } from 'element-plus'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useStore } from '../stores' // 导入 Pinia store

export default defineComponent({
  name: 'TaskOne',
  components: { ElDatePicker },
  setup() {
    const store = useStore()
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
    // 初始化 Leaflet 地图
    const map = L.map('map').setView([0, 0], 2) // 中心点 (纬度,经度), 缩放级别
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    // 示例数据：添加一个热浪事件标记
    L.circle([20, 120], {
      radius: 500000, // 半径（单位：米）
      color: 'red',
      fillOpacity: 0.5,
    })
      .addTo(map)
      .bindPopup('示例热浪事件：频率高，强度中等')
  },
})
</script>

<style>
/* 确保地图显示正常 */
#map {
  width: 100%;
}
</style>
