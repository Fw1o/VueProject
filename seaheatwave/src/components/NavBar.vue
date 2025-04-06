<!-- components/NavBar.vue -->
<template>
  <el-menu mode="horizontal" :router="true">
    <el-menu-item index="/task1">时空分布分析</el-menu-item>
    <el-menu-item index="/task2">多变量关联分析</el-menu-item>
    <el-menu-item index="/task3">生态影响评估</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>
