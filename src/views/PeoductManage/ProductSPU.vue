<template>
  <div>
    <Category :disabled="disabled"></Category>
    <el-card>
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="category3Id?false:true"
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
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                title="修改SPU"
                @click="editSpu(1, scope.row)"
              ></el-button>
              <el-button type="info" icon="el-icon-view" size="mini" title="查看SKU"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" title="删除SPU"></el-button>
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
  </div>
</template>

<script>
import Category from '@/components/Category'
import SpuForm from '@/views/PeoductManage/components/SpuForm.vue'
import SkuForm from '@/views/PeoductManage/components/SkuForm.vue'
import { reqHasSpu } from '@/api/product'
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
  },
}
</script>

<style lang="scss" scoped>

</style>