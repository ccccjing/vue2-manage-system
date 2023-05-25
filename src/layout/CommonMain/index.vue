<template>
  <el-container>
    <el-main>
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "CommonMain",
};
</script>

<style lang="scss" scoped>
.el-main {
  width: 100%;
  padding: 0 20px;
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}
</style>