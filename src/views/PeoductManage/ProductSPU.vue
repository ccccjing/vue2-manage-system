<template>
  <div>
    <Category :disabled="disabled"></Category>
    <el-card>
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="category3Id?false:true"
          v-isTrue="`btn.Spu.add`"
          @click="addSpu(1)"
        >添加SPU</el-button>
        <el-table style="margin:10px 0" border :data="records" v-loading="loading">
          <el-table-column label="序号" type="index" width="80"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加SKU"
                @click="addSku(scope.row)"
                v-isTrue="`btn.Spu.addsku`"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                title="修改SPU"
                @click="editSpu(1, scope.row)"
                v-isTrue="`btn.Spu.update`"
              ></el-button>
              <el-button
                type="info" 
                icon="el-icon-view" 
                size="mini"
                title="查看SKU"
                @click="findSku(scope.row)"
                v-isTrue="`btn.Spu.skus`"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除SPU"
                @click="deleteSpu(scope.row)"
                v-isTrue="`btn.Spu.delete`"
              ></el-button>
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
      </div>
      <spu-form
        ref="spuForm"
        v-show="scene === 1"
        @changeScene="changeScene"
      ></spu-form>
      <sku-form
        ref="skuForm"
        v-show="scene === 2"
        @changeScene="changeScene"
      ></sku-form>
    </el-card>
    <el-dialog title="SKU列表" :visible.sync="dialogTableVisible">
      <el-table :data="skuArr" border>
        <el-table-column prop="skuName" label="sku名称"></el-table-column>
        <el-table-column prop="price" label="sku价格(元)"></el-table-column>
        <el-table-column prop="weight" label="sku重量(克)"></el-table-column>
        <el-table-column label="sku图片">
          <template slot-scope="scope">
            <img :src="`${scope.row.skuDefaultImg}`" alt="" style="width:80px;hieght:80px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import Category from '@/components/Category'
import SpuForm from '@/views/PeoductManage/components/SpuForm.vue'
import SkuForm from '@/views/PeoductManage/components/SkuForm.vue'
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product'
import { mapGetters } from 'vuex'
export default {
  name: 'ProductSPU',
  components: {Category, SpuForm, SkuForm},
  data () {
    return {
      disabled: false,
      loading: false,
      currentPage: 1,
      pageSize: 3,
      records: [],
      total: 0,
      scene: 0,
      skuArr: [],
      dialogTableVisible: false
    }
  },
  computed: {
    ...mapGetters(['category1Id', 'category2Id', 'category3Id'])
  },
  watch: {
    category3Id(val) {
      if (val) {
        this.getHasSpu()
      }
    },
    scene(val) {
      if (val) {
        this.disabled = true
      } else {
        this.disabled = false
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
      if (result.code === 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
      this.loading = false
    },
    changeScene({scene, params}) {
      this.scene = scene
      if (params === 'update') {
        this.getHasSpu(this.currentPage)
      } else {
        this.getHasSpu()
      }
    },
    editSpu(scene, row) {
      this.scene = scene
      this.$refs.spuForm.getRecord(row)
    },
    addSpu(scene) {
      this.scene = scene
      this.$refs.spuForm.initSpu(this.category3Id)
    },
    addSku(row) {
      this.scene = 2
      this.$refs.skuForm.initSku(this.category1Id, this.category2Id, row)
    },
    async findSku(row) {
      const result = await reqSkuList(row.id)
      if (result.code === 200) {
        this.skuArr = result.data || []
        this.dialogTableVisible = true
      }
    },
    deleteSpu(row) {
      this.$confirm('此操作将永久删除该SPU, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await reqRemoveSpu(row.id)
        console.log(result)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getHasSpu(this.records.length>1?this.currentPage:this.currentPage-1)
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
  beforeDestroy() {
    this.$store.commit('CLEAR_STATE')
  }
}
</script>

<style lang="scss" scoped>

</style>