<template>
  <div>
    <h2>海洋热浪生态影响评估</h2>
    <div id="map-task3" style="height: 500px"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default defineComponent({
  name: 'TaskThree',
  data() {
    return {
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
    this.map = L.map('map-task3', {
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

    L.marker([-20, 150], {
      icon: L.divIcon({ html: '<span style="color: red">●</span>' }),
    })
      .addTo(this.map)
      .bindPopup('珊瑚白化区域')
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove()
    }
  },
})
</script>

<style>
#map-task3 {
  width: 100%;
}
</style>
