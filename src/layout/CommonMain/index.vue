<template>
  <el-container style="overflow: auto">
    <el-main>
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedTags">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "CommonMain",
  computed: {
    ...mapGetters(['cachedTags'])
  },
};
</script>

<style lang="scss" scoped>
.el-main {
  width: 100%;
  padding: 20px;
  height: 100%;
  overflow: auto;
}
</style>