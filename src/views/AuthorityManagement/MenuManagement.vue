<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      v-loading="loading">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="code" label="权限值" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            :disabled="scope.row.level===4?true:false"
            @click="addPermission(scope.row)"
            v-isTrue="`btn.Trademark.add`"
          >
            {{ scope.row.level===3?'添加功能':'添加菜单' }}
          </el-button>
          <el-button
            type="warning"
            size="mini"
            :disabled="scope.row.level===1?true:false"
            @click="editPermission(scope.row)"
            v-isTrue="`btn.Trademark.update`"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            :disabled="scope.row.level===1?true:false"
            @click="deletePremission(scope.row)"
            v-isTrue="`btn.Trademark.remove`"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="form.id?'编辑':'添加'" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值" :label-width="formLabelWidth">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqHasPermission,
  reqAddOrUpdateMenu,
  reqRemovePermission
} from '@/api/acl'

export default {
  name: 'MenuManagement',
  data () {
    return {
      tableData: [],
      loading: false,
      dialogFormVisible: false,
      formLabelWidth: '60px',
      btnLoading: false,
      form: {
        name: '',
        code: '',
        level: 0,
        pid: 0
      }
    }
  },
  methods: {
    // 获取已有菜单
    async getHasPermission() {
      this.loading = true
      const result = await reqHasPermission()
      if (result.code === 200) {
        this.tableData = result.data
        console.log(this.tableData)
      }
      this.loading = false
    },
    // 添加菜单
    addPermission(row) {
      Object.assign(this.form, {
        name: '',
        code: '',
        level: row.level + 1,
        pid: row.id
      })
      this.dialogFormVisible = true
      console.log(row)
    },
    // 编辑菜单
    editPermission(row) {
      Object.assign(this.form, row)
      this.dialogFormVisible = true
    },
    async confirm() {
      this.btnLoading = true
      const result = await reqAddOrUpdateMenu(this.form)
      if (result.code === 200) {
        this.$message({
          type: 'success',
          message: this.form.id ? '修改成功' : '添加成功'
        })
        this.dialogFormVisible = false
        this.getHasPermission()
      } else {
        this.$message({
          type: 'error',
          message: this.form.id ? '修改失败' : '添加失败'
        })
      }
      this.btnLoading = false
    },
    // 删除菜单
    deletePremission(row) {
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await reqRemovePermission(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getHasPermission()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
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
    this.getHasPermission()
  }
}
</script>

<style lang="scss" scoped>

</style>