<template>
  <el-container>
    <!-- aside -->
    <el-aside style="width: auto">
      <common-aside />
    </el-aside>
    <el-container>
      <!-- header -->
      <el-header>
        <common-header />
      </el-header>
      <!-- tags -->
      <common-tags />
      <!-- main -->
      <common-main />
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from './CommonAside'
import CommonHeader from './CommonHeader'
import CommonMain from './CommonMain'
import CommonTags from './CommonTags'

export default {
  name: "CommonLayout",
  components: {
    CommonAside,
    CommonHeader,
    CommonMain,
    CommonTags
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

