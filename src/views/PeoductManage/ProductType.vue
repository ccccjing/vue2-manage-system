<template>
  <div>
    <el-card>
      <!-- 添加按钮 -->
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addProduct"
      >添加产品</el-button>
      <!-- 展示表格 -->
      <el-table border :data="trademarkList" v-loading="loading">
        <el-table-column
          label="序号"
          width="80"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="产品名称" prop="tmName"></el-table-column>
        <el-table-column label="产品Logo">
          <template slot-scope="scope">
            <img
              :src="scope.row.logoUrl"
              alt=""
              style="width: 80px; height: 80px"
            />
          </template>
        </el-table-column>
        <el-table-column label="产品操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="editProduct(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delProduct(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[3, 5, 7, 9]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <el-dialog :title="productForm.id?'修改产品':'添加产品'" :visible.sync="dialogFormVisible">
      <el-form
        label-position="left"
        label-width="90px"
        v-loading="isLoading"
        :model="productForm"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="产品名称" prop="tmName">
          <el-input v-model="productForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="产品LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="productForm.logoUrl" :src="productForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm"  :loading="isLoading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogDelVisible"
      width="30%">
      <span>您确定删除该产品吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelproduct">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { reqProduct, reqAddOrUpdateProduct, reqDelProduct } from "@/api/product";
export default {
  name: "ProductType",
  data() {
    const validateTmName = (rule, value, callback) => {
      if(value.trim().length >= 2) {
        callback()
      } else {
        callback(new Error('产品名称需要两位及以上'))
      }
    };
    const validateLogoUrl = (rule, value, callback) => {
      if(value) {
        callback()
      } else {
        callback(new Error('请上传图片'))
      }
    }
    return {
      currentPage: 1,
      pageSize: 3,
      pages: 0,
      total: 0,
      id: 0,
      trademarkList: [],
      loading: false,
      isLoading: false,
      dialogFormVisible: false,
      dialogDelVisible: false,
      productForm: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: { required: true, validator: validateTmName, trigger: 'blur' },
        logoUrl: { required: true, validator: validateLogoUrl }
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTrademark();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTrademark();
    },
    // 获取产品列表
    async getTrademark() {
      this.loading = true;
      let result = await reqProduct(this.currentPage, this.pageSize);
      this.loading = false;
      if (result.code === 200) {
        let { data } = result;
        this.total = data.total;
        this.trademarkList = data.records;
        this.pages = data.pages
      }
    },
    // 添加产品弹框
    addProduct() {
      this.dialogFormVisible = true;
      this.productForm.tmName = ''
      this.productForm.logoUrl = ''
      this.productForm.id = 0
      this.$refs.formRef?.clearValidate()
    },
    // 修改产品弹框
    editProduct(row) {
      this.dialogFormVisible = true;
      Object.assign(this.productForm, row)
      console.log(this.productForm)
    },
    // 图片上传前
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/peg" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      this.productForm.logoUrl = URL.createObjectURL(file.raw);
      this.$refs.formRef?.clearValidate('logoUrl')
    },
    // 添加、修改产品
    async confirm() {
      this.$refs.formRef.validate(async (valid) => {
        if(valid) {
          this.isLoading = true
          let result = await reqAddOrUpdateProduct(this.productForm)
          console.log(result)
          if(result.code === 200) {
            Message({
              type: 'success',
              message: this.productForm.id?'修改产品成功':'添加产品成功'
            })
            this.currentPage = this.productForm.id? this.currentPage : 1
            this.getTrademark()
          } else {
            Message({
              type: 'error',
              message: this.productForm.id?'修改产品失败':'添加产品失败'
            })
          }
          this.isLoading = false
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
      
    },
    // 删除弹框
    delProduct(row) {
      this.dialogDelVisible = true
      this.id = row.id
    },
    // 删除产品
    async confirmDelproduct() {
      let result = await reqDelProduct(this.id)
      console.log(this.trademarkList.length)
      if(result.code === 200) {
        Message({
          type: 'success',
          message: '删除产品成功'
        })
      } else {
        Message({
          type: 'error',
          message: '删除产品失败'
        })
      }
      this.dialogDelVisible = false
      this.currentPage = this.trademarkList.length > 1 ? this.currentPage : this.currentPage - 1
      this.getTrademark(this.currentPage)
    }
  },
  mounted() {
    this.getTrademark();
  },
};
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
::v-deep .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>