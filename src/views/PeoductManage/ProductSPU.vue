<template>
  <div>
    <Category :disabled="disabled"></Category>
    <el-card>
      <el-button
        type="primary"
        icon="el-icon-plus"
        :disabled="category3Id?false:true"
      >添加SPU</el-button>

      <el-table style="margin:10px 0" border :data="records" v-loading="loading">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="280">
          <template>
            <el-button type="success" icon="el-icon-plus" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="info" icon="el-icon-view" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 7, 9]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Category from '@/components/Category'
import { reqHasSpu } from '@/api/product'
import { mapGetters } from 'vuex'
export default {
  name: 'ProductSPU',
  components: {Category},
  data () {
    return {
      disabled: false,
      loading: false,
      currentPage: 1,
      pageSize: 3,
      records: [],
      total: 0,
    }
  },
  computed: {
    ...mapGetters(['category3Id'])
  },
  watch: {
    category3Id(val) {
      if (val) {
        this.getHasSpu()
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.getHasSpu()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getHasSpu()
    },
    async getHasSpu() {
      this.loading = true
      const result = await reqHasSpu(this.currentPage, this.pageSize, this.category3Id)
      console.log(result)
      if (result.code === 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
      this.loading = false
    }
  },
}
</script>

<style lang="scss" scoped>

</style>