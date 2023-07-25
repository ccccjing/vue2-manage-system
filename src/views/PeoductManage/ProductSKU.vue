<template>
  <div>
    <el-card>
      <el-table border :data="skuArr" v-loading="loading" max-height="430">
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
            <el-button
              size="mini"
              type="info"
              icon="el-icon-info"
              @click="open(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteSku(scope.row)"
            ></el-button>
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
    <el-drawer
      title="商品详情"
      :visible.sync="drawer"
      :direction="direction"
    >
      <div class="drwaer">
        <el-row>
          <el-col :span="8">名称</el-col>
          <el-col :span="16">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">描述</el-col>
          <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">价格</el-col>
          <el-col :span="16">{{ skuInfo.price}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">平台属性</el-col>
          <el-col :span="16">
            <el-tag
              size="mini"
              v-for="item in skuInfo.skuAttrValueList" 
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">销售属性</el-col>
          <el-col :span="16">
            <el-tag
              size="mini"
              v-for="item in skuInfo.skuSaleAttrValueList" 
              :key="item.id"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">商品图片</el-col>
          <el-col :span="16">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  reqSkuArr,
  reqOnSale,
  reqCancelSale,
  reqSkuInfo,
  reqDeleteSku
} from '@/api/product'
import { Message } from 'element-ui'
export default {
  name: 'ProductSKU',
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      skuArr: [],
      loading: false,
      drawer: false,
      direction: 'rtl',
      skuInfo: []
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
    },
    async open(row) {
      this.drawer = true
      const result = await reqSkuInfo(row.id)
      if (result.code === 200) {
        this.skuInfo = result.data
      }
      console.log(this.skuInfo)
    },
    deleteSku(row) {
      this.$confirm('此操作将永久删除该SKU, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await reqDeleteSku(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getHasSku(this.skuArr.length===1?this.currentPage-1:this.currentPage)
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
  mounted() {
    this.getHasSku()
  }
}
</script>

<style lang="scss" scoped>
.drwaer {
  padding: 20px;
  .el-row {
    margin: 10px 0;
    .el-tag {
      margin: 3px;
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
}
</style>