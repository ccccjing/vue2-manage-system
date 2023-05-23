<template>
  <el-container>
    <el-aside style="width: auto">
      <common-aside />
    </el-aside>
    <el-container>
      <el-header>
        <common-header />
      </el-header>
      <el-main>
        <common-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from './CommonAside'
import CommonHeader from './CommonHeader'
import CommonMain from './CommonMain'

export default {
  name: "CommonLayout",
  components: {
    CommonAside,
    CommonHeader,
    CommonMain
  }
};
</script>

<style lang="scss" scoped>
body > .el-container {
  margin-bottom: 40px;
}
.el-header {
  padding: 0;
}
</style>

