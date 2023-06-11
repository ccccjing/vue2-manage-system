<template>
  <div>
    <el-card>
      <el-table border :data="skuArr" v-loading="loading">
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          label="名称"
          width="150"
          show-overflow-tooltip
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          width="150"
          show-overflow-tooltip
          prop="skuDesc"
        ></el-table-column>
        <el-table-column
          label="默认图片"
          width="150"
        >
          <template slot-scope="scope">
            <img :src="scope.row.skuDefaultImg" alt="" style="width:80px;height:80px">
          </template>
        </el-table-column>
        <el-table-column
          label="重量(克)"
          width="150"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="价格(元)"
          width="150"
          prop="price"
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="250"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              :icon="scope.row.isSale===1?`el-icon-bottom`:`el-icon-top`"
              @click="updateSale(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="updateSku"
            ></el-button>
            <el-button size="mini" type="info" icon="el-icon-info"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { reqSkuArr, reqOnSale, reqCancelSale } from '@/api/product'
import { Message } from 'element-ui'
export default {
  name: 'ProductSKU',
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      skuArr: [],
      loading: false
    }
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.getHasSku()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getHasSku()
    },
    async getHasSku() {
      this.loading = true
      const result = await reqSkuArr(this.currentPage, this.pageSize)
      if (result.code === 200) {
        this.total = result.data?.total
        this.skuArr = result.data?.records
      }
      this.loading = false
    },
    async updateSale(row) {
      if (row.isSale) {
        await reqCancelSale(row.id)
        Message({
          type: 'success',
          message: '下架成功'
        })
      } else {
        await reqOnSale(row.id)
        Message({
          type: 'success',
          message: '上架成功'
        })
      }
      this.getHasSku()
    },
    updateSku() {
      Message({
        type: 'success',
        message: '开发中......'
      })
    }
  },
  mounted() {
    this.getHasSku()
  }
}
</script>

<style lang="scss" scoped>

</style>