import { createApp } from 'vue'
import { createPinia } from 'pinia' // 导入 Pinia
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia() // 创建 Pinia 实例

app.use(pinia) // 注册 Pinia
app.use(router)
app.use(ElementPlus)
app.mount('#app')
