<template>
  <div>
    <el-form label-width="100px" :model="recordData">
      <el-form-item label="SPU名称">
        <el-input
          placeholder="请输入SPU名称"
          v-model="recordData.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select placeholder="请选择品牌名" v-model="recordData.tmId">
          <el-option
            v-for="list in trademarkList"
            :key="list.id"
            :label="list.tmName"
            :value="list.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          autosize
          placeholder="请输入描述"
          type="textarea"
          v-model="recordData.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU照片">
        <el-upload
          :file-list="imgList"
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeImgUpload"
          :on-remove="handleRemove"
          :on-change="handleChange"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select
          :placeholder="unSelectSaleAttr.length?`还有${unSelectSaleAttr.length}个未选择`:`无`"
          v-model="saleAttrIdAndValueName"
        >
          <el-option
            v-for="attr in unSelectSaleAttr"
            :key="attr.id"
            :label="attr.name"
            :value="`${attr.id}:${attr.name}`"
          ></el-option>
        </el-select>
        <el-button
          style="marginleft: 8px"
          type="primary"
          icon="el-icon-plus"
          :disabled="saleAttrIdAndValueName.length?false:true"
          @click="addSaleAttr"
          >添加属性</el-button
        >
        <el-table border :data="saleAttrList">
          <el-table-column label="序号" width="80" type="index"></el-table-column>
          <el-table-column label="属性名" width="80" prop="saleAttrName"></el-table-column>
          <el-table-column label="属性值">
            <template slot-scope="scope">
              <el-tag
                :key="index"
                v-for="(tag, index) in scope.row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,index)">
                {{tag.saleAttrValueName}}
              </el-tag>
              <el-input
                :ref="vc => inputArr[scope.$index] = vc"
                class="input-new-tag"
                v-if="scope.row.flag"
                v-model="scope.row.saleAttrValue"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row, scope.$index)"
                @blur="handleInputConfirm(scope.row, scope.$index)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="mini"
                @click="showInput(scope.row, scope.$index)"
                icon="el-icon-plus"
                type="success"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delSaleAttr(scope)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          :disabled="saleAttrList.length?false:true"
          type="primary"
          @click="save"
          :loading="isLoading"
        >保存</el-button>
        <el-button @click="cancel(0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  reqTrademarkList,
  reqSpuImageList,
  reqBaseSaleAttrList,
  reqSpuSaleAttrList,
  reqAddOrUpdateSpu
} from "@/api/product";
import { Message } from 'element-ui';
export default {
  name: "SpuForm",
  props: ["changeScene"],
  data() {
    return {
      recordData: {
        category3Id: "",
        spuName: "",
        tmId: "",
        description: "",
        spuImageList: [],
        spuSaleAttrList: [],
      },
      trademarkList: [],
      imgList: [],
      baseSaleAttrList: [],
      saleAttrList: [],
      dialogVisible: false,
      dialogImageUrl: "",
      saleAttrIdAndValueName: '',
      inputArr: [],
      isLoading: false
    };
  },
  computed: {
    unSelectSaleAttr() {
      let unSelectAttr = this.baseSaleAttrList.filter((attr) => {
        return this.saleAttrList.every(item => {
          return item.saleAttrName !== attr.name
        })
      })
      return unSelectAttr
    }
  },
  methods: {
    cancel(scene) {
      this.$emit("changeScene", {scene: 0, params: 'update'});
    },
    async getRecord(record) {
      this.recordData = record;

      let result1 = await reqTrademarkList();
      let result2 = await reqSpuImageList(record.id);
      let result3 = await reqBaseSaleAttrList();
      let result4 = await reqSpuSaleAttrList(record.id);
      console.log(result4)
      this.trademarkList = result1.data;
      this.imgList = result2.data.map((item) => {
        return {
          name: item.imgName,
          url: item.imgUrl,
        };
      });
      this.baseSaleAttrList = result3.data;
      this.saleAttrList = result4.data;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeImgUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/gif" ||
        file.type === "image/peg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/GIF/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleChange(file, fileList) {
      this.imgList = fileList
    },
    delSaleAttr(scope) {
      this.saleAttrList.splice(scope.$index, 1)
    },
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.saleAttrIdAndValueName.split(':')
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList:[]
      }
      this.saleAttrList.push(newSaleAttr)
      this.saleAttrIdAndValueName= ''
    },
    showInput(row, $index) {
      this.$set(row, 'flag', true)
      this.$set(row, 'saleAttrValue', '')
      this.$nextTick(_ => {
        this.inputArr[$index].focus();
      });
    },
    handleInputConfirm(row) {
      let { baseSaleAttrId, saleAttrValue } = row
      console.log(row)
      let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: saleAttrValue
      }
      // 判断属性值是否为空
      if (saleAttrValue.trim() === '') {
        Message({
          type: 'error',
          message: '属性值不能为空'
        })
        row.flag = false;
        return
      }
      // 判断属性值是否重复
      let temp = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName === saleAttrValue
      })
      if (temp) {
        Message({
          type: 'warning',
          message: '属性值重复'
        })
        row.flag = false;
        return
      }

      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.flag = false;
    },
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1)
    },
    async save() {
      this.isLoading = true
      console.log(this.imgList)
      this.recordData.spuImageList = this.imgList.map(item => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
      this.recordData.spuSaleAttrList = this.saleAttrList
      console.log(this.recordData)
      const result = await reqAddOrUpdateSpu(this.recordData)
      if (result.code === 200) {
        Message({
          type: 'success',
          message: this.recordData.id ? '修改成功':'添加成功'
        })
        this.$emit("changeScene", { scene: 0, params: this.recordData.id?'update':'add'});
      } else {
        Message({
          type: 'error',
          message: this.recordData.id ? '修改失败':'添加失败'
        })
      }
      this.isLoading = false
    },
    async initSpu(category3Id) {
      Object.assign(this.recordData, {
        category3Id: "",
        spuName: "",
        tmId: "",
        description: "",
        spuImageList: [],
        spuSaleAttrList: [],
      })
      this.imgList = []
      this.saleAttrList = []
      this.saleAttrIdAndValueName = ''
      this.recordData.id = ''

      let result1 = await reqTrademarkList();
      let result2 = await reqBaseSaleAttrList();

      this.trademarkList = result1.data;
      this.baseSaleAttrList = result2.data;
      this.recordData.category3Id = category3Id
    }
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>