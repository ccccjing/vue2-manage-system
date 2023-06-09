<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input placeholder="重量(克)" type="number" v-model="skuParams.weight"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input type="textarea" placeholder="SKU描述" v-model="skuParams.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form
          inline
          label-width="100px"
          style="marginRight:0"
        >
          <el-form-item
            v-for="item in attrArr"
            :key="item.id"
            :label="item.attrName"
            style="marginTop:6px"
          >
            <el-select
              placeholder="请选择"
              v-model="item.attrIdAndValueId"
              >
              <el-option
                v-for="attrValue in item.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${item.id}:${attrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline label-width="80px">
          <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName">
            <el-select placeholder="请选择" v-model="item.saleIdAndValueId">
              <el-option
                v-for="saleName in item.spuSaleAttrValueList"
                :key="saleName.id"
                :label="saleName.saleAttrValueName"
                :value="`${item.id}:${saleName.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <template>
          <el-table border :data="imgArr" ref="singleTable">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column label="图片">
              <template slot-scope="scope">
                <img
                  :src="scope.row.imgUrl"
                  alt=""
                  style="width:80px;height:80px"
                >
              </template>
            </el-table-column>
            <el-table-column label="名称" prop="imgName"></el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="warning" size="mini" @click="setDefault(scope.row)">设置默认</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-button type="primary" @click="save" :loading="loading">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  reqAttrInfoList,
  reqSpuImageList,
  reqSpuSaleAttrList,
  reqAddSku
} from '@/api/product'
import { Message } from 'element-ui'
export default {
  name: 'SkuForm',
  props: ['changeScene'],
  data () {
    return {
      attrArr: [],
      imgArr: [],
      saleArr: [],
      loading: false,
      skuParams: {
        category3Id: '',
        spuId: '',
        tmId: '',
        skuName: '',
        price: '',
        weight: '',
        skuDesc: '',
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuDefaultImg: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('changeScene', { scene: 0, params: ''})
    },
    async initSku(category1Id, category2Id, row) {
      this.skuParams.category3Id = row.category3Id
      this.skuParams.spuId = row.id
      this.skuParams.tmId = row.tmId

      const result1 = await reqAttrInfoList(category1Id, category2Id, row.category3Id)
      const result2 = await reqSpuImageList(row.id)
      const result3 = await reqSpuSaleAttrList(row.id)

      this.attrArr = result1.data
      this.imgArr = result2.data
      this.saleArr = result3.data
      console.log(this.imgArr)
    },
    setDefault(row) {
      this.imgArr.forEach(item => {
        this.$refs.singleTable.toggleRowSelection(item, false)
      })
      this.$refs.singleTable.toggleRowSelection(row, true)
      this.skuParams.skuDefaultImg = row.imgUrl
    },
    async save() {
      this.loading = true
      this.skuParams.skuAttrValueList = this.attrArr.reduce((pre, next) => {
        if (next.attrIdAndValueId) {
          const [attrId, valueId] = next.attrIdAndValueId.split(':')
          pre.push({
            attrId,
            valueId
          })
        }
        return pre
      }, [])
      this.skuParams.skuSaleAttrValueList = this.saleArr.reduce((pre, next) => {
        if (next.saleIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
          pre.push({
            saleAttrId,
            saleAttrValueId
          })
        }
        return pre
      }, [])
      console.log(this.skuParams)
      const result = await reqAddSku(this.skuParams)
      if (result.code === 200) {
        Message({
          type: 'success',
          message: '添加成功'
        })
        this.$emit('changeScene', { scene: 0, params: '' })
      } else {
        Message({
          type: 'error',
          message: '添加失败'
        })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>