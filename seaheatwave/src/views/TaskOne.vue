<template>
  <div>
    <h2>海洋热浪时空分布特征分析</h2>
    <el-date-picker
      v-model="localTimeRange"
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
import { defineComponent, ref, watch } from 'vue'
import { ElDatePicker } from 'element-plus'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useOceanStore } from '../stores'

export default defineComponent({
  name: 'TaskOne',
  components: { ElDatePicker },
  setup() {
    const store = useOceanStore()

    // 本地 ref 用于 v-model
    const localTimeRange = ref([...store.timeRange])

    // 定义 map 和 heatwaveLayer 为 ref
    const map = ref(null)
    const heatwaveLayer = ref(null)

    // 同步 store.timeRange 到 localTimeRange
    watch(
      () => store.timeRange,
      (newVal) => {
        localTimeRange.value = [...newVal]
      },
      { deep: true },
    )

    // 更新时间并触发数据刷新
    const updateTime = (val) => {
      if (val) {
        store.updateTimeRange(val[0], val[1])
        fetchHeatwaveData()
      }
    }

    // 获取并渲染热浪数据
    const fetchHeatwaveData = async () => {
      try {
        const response = await fetch('/data/heatwave.geojson')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const geojsonData = await response.json()

        // 修正经度（如果超过 180）
        geojsonData.features.forEach((feature) => {
          feature.geometry.coordinates[0].forEach((coord) => {
            if (coord[0] > 180) {
              coord[0] -= 360 // 归一化到 -180 到 180
            }
          })
        })

        if (heatwaveLayer.value) {
          map.value.removeLayer(heatwaveLayer.value)
        }

        const filteredData = filterByTimeRange(geojsonData)

        heatwaveLayer.value = L.geoJSON(filteredData, {
          style: {
            color: 'red',
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.3,
          },
          onEachFeature: (feature, layer) => {
            layer.bindPopup(
              `Cluster ID: ${feature.properties.cluster_id}<br>` +
                `开始日期: ${feature.properties.earliest_start_date}<br>` +
                `结束日期: ${feature.properties.latest_end_date}<br>` +
                `最大温度: ${feature.properties.max_temp} ℃`,
            )
          },
        }).addTo(map.value)

        map.value.fitBounds(heatwaveLayer.value.getBounds())
      } catch (error) {
        console.error('获取热浪数据失败:', error)
      }
    }

    // 过滤时间范围
    const filterByTimeRange = (geojsonData) => {
      const [start, end] = localTimeRange.value
      if (!start || !end) return geojsonData

      const startDate = new Date(start).getTime()
      const endDate = new Date(end).getTime()

      return {
        ...geojsonData,
        features: geojsonData.features.filter((feature) => {
          const featureStart = new Date(feature.properties.earliest_start_date).getTime()
          const featureEnd = new Date(feature.properties.latest_end_date).getTime()
          return featureStart <= endDate && featureEnd >= startDate
        }),
      }
    }

    return {
      localTimeRange,
      updateTime,
      map,
      heatwaveLayer,
      fetchHeatwaveData,
    }
  },
  mounted() {
    // 定义世界地图的最大边界
    const worldBounds = L.latLngBounds(
      L.latLng(-90, -180), // 南西角
      L.latLng(90, 180), // 北东角
    )

    // 初始化地图，设置 maxBounds 和初始缩放
    this.map = L.map('map-task1', {
      maxBounds: worldBounds, // 限制拖动范围
      maxBoundsViscosity: 1.0, // 边界弹性（1.0 表示完全固定）
      worldCopyJump: false, // 禁用跨世界跳转
      minZoom: 2, // 最小缩放级别，确保显示完整世界
      maxZoom: 18, // 最大缩放级别
    }).setView([0, 0], 2) // 初始视角为中心点，缩放级别 2

    // 添加瓦片层，禁用 wrap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      noWrap: true, // 禁用经度方向的瓦片重复
      bounds: worldBounds, // 限制瓦片加载范围
    }).addTo(this.map)

    // 初次加载数据
    this.fetchHeatwaveData()
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove()
    }
  },
})
</script>

<style>
#map-task1 {
  width: 100%;
}
</style>
