import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('ocean', () => {
  // 状态：时间范围和空间区域
  const timeRange = ref([new Date(2020, 0, 1), new Date()]) // 默认时间范围：2020-01-01 至今
  const spatialArea = ref({ lat: [0, 90], lon: [-180, 180] }) // 默认空间范围：全球

  // 方法：更新时间范围
  function updateTimeRange(start, end) {
    timeRange.value = [start, end]
  }

  // 方法：更新空间区域（可选，未来扩展用）
  function updateSpatialArea(lat, lon) {
    spatialArea.value = { lat, lon }
  }

  return { timeRange, spatialArea, updateTimeRange, updateSpatialArea }
})
