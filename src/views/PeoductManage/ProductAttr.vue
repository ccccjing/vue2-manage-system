<template>
  <div>
    <Category></Category>
    <el-card>
      <el-button
        type="primary"
        icon="el-icon-plus"
      >添加属性</el-button>
      <el-table border style="margin:10px 0">
        <el-table-column label="序号" width="80"></el-table-column>
        <el-table-column label="属性名称" width="120"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" width="120"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Category from '@/components/Category'
import { reqCategory1 } from '@/api/product'
export default {
  name: 'ProductAttr',
  components: {Category},
  data() {
    return {
      category: []
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>

</style>