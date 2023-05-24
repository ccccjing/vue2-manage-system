<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'CommonMain'
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  height: 100%;
}
</style>