<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'App',
  mounted() {
    login({username: 'admin', passowrd: '111111'}).then(res => console.log(res));
  }
}
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  #app {
    height: 100vh;
    .el-container {
      height: 100%;
    }
  }
}
a {
  text-decoration: none;
}

.clearfix {
  float: right;
}

.el-table {
  margin: 10px 0;
}
</style>
