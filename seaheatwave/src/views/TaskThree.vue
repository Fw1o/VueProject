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
      map: null, // 保存地图实例
    }
  },
  mounted() {
    this.map = L.map('map-task3').setView([0, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map)

    L.marker([-20, 150], {
      icon: L.divIcon({ html: '<span style="color: red">●</span>' }),
    })
      .addTo(this.map)
      .bindPopup('珊瑚白化区域')
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove() // 清理地图实例
    }
  },
})
</script>

<style>
#map-task3 {
  width: 100%;
}
</style>
