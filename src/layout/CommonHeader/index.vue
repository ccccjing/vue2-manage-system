<template>
  <div class="header">
    <i class="el-icon-menu" @click="toggleAside"></i>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
         <el-avatar
         size='medium'
         src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
         ></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  methods: {
    toggleAside() {
      this.$store.dispatch('toggleAside')
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #999;
  color: #333;
  line-height: 60px;
  i {
    margin-left: 20px;
    cursor: pointer;
    color: #fff;
  }
  .el-dropdown {
    width: 64px;
    height: 60px;
    float: right;
    .el-avatar--medium {
      margin-top: 10px;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>