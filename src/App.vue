<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
html,body {
  padding: 0;
  margin: 0;
  #app {
    height: 100vh;
    .el-container {
      height: 100%;
    }
  }
}
</style>
