<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  mounted() {
    axios({
      url: '/user/userInfo',
      method: 'get'
    }).then(res => {
      console.log(res)
    })
  }
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
