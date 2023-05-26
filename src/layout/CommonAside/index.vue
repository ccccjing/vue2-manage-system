<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="aside.isCollapse"
    :unique-opened="true"
    :router="true"
  >
    <div class="title">{{ aside.isCollapse ? '后台' : '后台管理系统' }}</div>
    <aside-item
      v-for="route in routes"
      :key="route.path"
      :item="route"
      :basePath="route.path"
    ></aside-item>
  </el-menu>
</template>

<script>
import { routes } from '@/router';
import { mapGetters } from 'vuex'
import AsideItem from "./AsideItem.vue"

export default {
  name: "CommonAside",
  components: { AsideItem },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'aside',
      'routes'
    ])
  },
  methods: {
  },
  mounted() {
    console.log(routes)
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100vh;
  border: none;
  .title {
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>