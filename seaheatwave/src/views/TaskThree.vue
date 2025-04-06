<template>
  <div>
    <h2>海洋热浪生态影响评估</h2>
    <div id="map" style="height: 500px"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default defineComponent({
  name: 'TaskThree',
  mounted() {
    const map = L.map('map').setView([0, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    // 示例：生态影响标记
    L.marker([-20, 150], {
      icon: L.divIcon({ html: '<span style="color: red">●</span>' }),
    })
      .addTo(map)
      .bindPopup('珊瑚白化区域')
  },
})
</script>

<style>
#map {
  width: 100%;
}
</style>
