<template>
  <div>
    <Category :disabled="isShow"></Category>
    <el-card>
      <!-- 属性列表 -->
      <div v-show="isShow">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="category3Id?false:true"
          @click="addAttr"
        >添加属性</el-button>
        <el-table border style="margin:10px 0" :data="attrArr" v-loading="loading">
          <el-table-column label="序号" type="index" width="80"></el-table-column>
          <el-table-column label="属性名称" prop="attrName" width="120"></el-table-column>
          <el-table-column label="属性值名称">
            <template slot-scope="scope">
              <el-tag
                v-for="attr in scope.row.attrValueList"
                :key="attr.id"
                style="margin: 0 3px 3px 0"
              >{{attr.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="open(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加或修改属性 -->
      <div v-show="!isShow">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="attrParams.attrName?false:true"
          @click="addAttrValue"
        >添加属性值</el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table border :data="attrParams.attrValueList">
          <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
          <el-table-column label="属性值">
            <template slot-scope="scope">
              <el-input
                :ref="vc => inputArr[scope.$index] = vc"
                v-if="!scope.row.flag"
                v-model="scope.row.valueName"
                @blur="changeFlag(scope.row, scope.$index)"
              ></el-input>
              <div v-else @click="changeFlag2(scope.row, scope.$index)">{{scope.row.valueName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
               <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delAttrValue(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="attrParams.attrValueList.length>0?false:true"
          :loading="isLoading"
        >保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import Category from '@/components/Category'
import { reqAttrInfoList, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
export default {
  name: 'ProductAttr',
  components: {Category},
  data() {
    return {
      attrArr: [],
      loading: false,
      isShow: true,
      isLoading: false,
      attrParams: {
        attrName: '',
        attrValueList: [],
        categoryId: '',
        categoryLevel: 3
      },
      inputArr: []
    }
  },
  computed: {
    ...mapGetters(['category1Id','category2Id','category3Id'])
  },
  watch: {
    category3Id(val) {
      if(val) {
        this.getAttr()
      } else {
        this.attrArr = []
      }
    }
  },
  methods: {
    // 获取已有属性列表
    async getAttr() {
      this.loading = true
      const result = await reqAttrInfoList(this.category1Id,this.category2Id,this.category3Id)
      if (result.code === 200) {
        this.attrArr = result.data
      }
      this.loading = false
    },
    cancel() {
      this.isShow = !this.isShow
    },
    // 添加属性按钮方法
    addAttr() {
      Object.assign(this.attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3
      })
      this.isShow = !this.isShow
    },
    // 添加属性值按钮方法
    addAttrValue() {
      this.attrParams.attrValueList.unshift({valueName: '', flag: false})
      this.$nextTick(() => {
        this.inputArr[0].focus()
      })
    },
    // 添加和修改属性请求
    async save() {
      this.isLoading = true
      const result = await reqAddOrUpdateAttr(this.attrParams)
      if (result.code === 200) {
        this.isShow = !this.isShow
        Message({
          type: 'success',
          message: this.attrParams.id?'修改成功':'添加成功'
        })
        this.getAttr()
      } else {
        Message({
          type: 'error',
          message: this.attrParams.id?'修改失败':'添加失败'
        })
      }
      this.isLoading = false
    },
    changeFlag(row, $index) {
      if (row.valueName.trim() === '') {
        this.attrParams.attrValueList.splice($index, 1)
        Message({
          type: 'error',
          message: '属性值不能为空'
        })
        return
      }
      let temp = this.attrParams.attrValueList.find(attr => {
        if (attr !== row) {
          return attr.valueName === row.valueName
        }
      })
      if (temp) {
        this.attrParams.attrValueList.splice($index, 1)
        Message({
          type: 'error',
          message: '属性值不能重复'
        })
        return
      }
      row.flag = true
      console.log(temp)
    },
    changeFlag2(row, $index) {
      row.flag = false
      this.$nextTick(() => {
        this.inputArr[$index].focus()
      })
    },
    // 删除属性值
    delAttrValue($index) {
      this.attrParams.attrValueList.splice($index, 1)
    },
    // 修改属性值
    updateAttr(row) {
      this.isShow = false
      Object.assign(this.attrParams, JSON.parse(JSON.stringify(row)))
      console.log(row)
    },
    // 删除属性
    async deleteAttr(attrId) {
      const result = await reqDeleteAttr(attrId)
      if (result.code === 200) {
        Message({
          type: 'success',
          message: '删除成功'
        })
        this.getAttr()
      } else {
        Message({
          type: 'error',
          message: '删除失败'
        })
      }
    },
    open(attrId) {
      console.log(attrId)
      this.$confirm('此操作将永久删除该属性, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteAttr(attrId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
}
</script>

<style lang="scss" scoped>

</style>