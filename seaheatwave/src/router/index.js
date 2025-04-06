import { createRouter, createWebHistory } from 'vue-router'
import TaskOne from '../views/TaskOne.vue'
import TaskTwo from '../views/TaskTwo.vue'
import TaskThree from '../views/TaskThree.vue'

const routes = [
  { path: '/task1', component: TaskOne, name: 'TaskOne' },
  { path: '/task2', component: TaskTwo, name: 'TaskTwo' },
  { path: '/task3', component: TaskThree, name: 'TaskThree' },
  { path: '/', redirect: '/task1' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
