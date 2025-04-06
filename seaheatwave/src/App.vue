<template>
  <div>
    <!-- 使用 Element Plus 的菜单组件作为导航 -->
    <el-menu mode="horizontal" :router="true" default-active="/task1">
      <el-menu-item index="/task1">时空分布</el-menu-item>
      <el-menu-item index="/task2">多变量分析</el-menu-item>
      <el-menu-item index="/task3">生态影响</el-menu-item>
    </el-menu>
    <!-- 路由视图，显示当前任务页面 -->
    <router-view />
  </div>
</template>

<script>
import { ElMenu, ElMenuItem } from 'element-plus'

export default {
  components: {
    ElMenu,
    ElMenuItem,
  },
}
</script>

<style>
/* 可选：调整导航样式 */
.el-menu {
  background-color: #f5f7fa;
}
</style>
