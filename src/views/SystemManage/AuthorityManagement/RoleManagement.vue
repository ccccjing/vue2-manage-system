<template>
  <div>
    <el-card class="search">
      <el-form inline>
        <el-form-item label="角色名称：">
          <el-input placeholder="请输入角色名称" clearable v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              size="medium"
              :disabled="keyword?false:true"
              @click="search"
            >搜索</el-button>
           <el-button size="medium" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" size="medium" @click="addRole">添加角色</el-button>
      <el-table border :data="roleList" v-loading="loading" max-height="310">
        <el-table-column label="#" align="center" type="index" width="80"></el-table-column>
        <el-table-column label="ID" prop="id" width="80"></el-table-column>
        <el-table-column label="角色名称" prop="roleName" width="160"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="160"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" width="160"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-user" @click="grant(scope.row)">分配权限</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateRole(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 7, 9, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background>
      </el-pagination>
    </el-card>
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form inline :model="form" :rules="rules" ref="roleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm" :loading="confirmBtn">确 定</el-button>
      </div>
    </el-dialog>
    <el-drawer
      title="分配权限"
      :visible.sync="drawer"
      custom-class="demo-drawer"
      ref="drawer"
      >
      <div class="demo-drawer__content">
        <el-tree
          ref="tree"
          :data="menuList"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="menuArr"
          :props="defaultProps">
        </el-tree>
        <div class="demo-drawer__footer">
          <el-button @click="drawer = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  reqRoleList,
  reqAddOrUpdateRole,
  reqRemoveRole,
  reqAllPermission,
  reqSetPermission
} from '@/api/acl'

export default {
  name: 'RoleManagement',
  data () {
    const validatorRoleName = (rule, value, callback) => {
      if (value.trim().length >= 2) {
        callback()
      } else {
        callback(new Error('角色名称至少2位'))
      }
    }
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      roleList: [],
      loading: false,
      keyword: '',
      dialogFormVisible: false,
      form: {
        roleName: ''
      },
      confirmBtn: false,
      rules: {
        roleName: [
          { required: true, trigger: 'blur', validator: validatorRoleName}
        ]
      },
      drawer: false,
      menuList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      menuArr: []
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getRoleList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getRoleList()
    },
    async getRoleList() {
      this.loading = true
      const result = await reqRoleList(this.currentPage, this.pageSize, this.keyword)
      console.log(result)
      if (result.code === 200) {
        this.roleList = result.data?.records
        this.total = result.data?.total
      }
      this.loading = false
    },
    search() {
      this.getRoleList()
    },
    reset() {
      this.keyword = ''
      this.getRoleList()
    },
    addRole() {
      this.form.roleName = ''
      this.dialogFormVisible = true
      this.$refs.roleForm?.clearValidate()
    },
    async confirm() {
      this.confirmBtn = true
      this.$refs.roleForm.validate(async valid => {
        if (valid) {
          const result = await reqAddOrUpdateRole(this.form)
          if (result.code === 200) {
            this.$message({
              message: this.form.id ? '修改成功': '添加成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.getRoleList()
          } else {
            this.$message({
              message: this.form.id ? '修改失败': '添加失败',
              type: 'error'
            })
          }
        } else {
          return false;
        }
      })
      this.confirmBtn = false
    },
    updateRole(row) {
      this.dialogFormVisible = true
      Object.assign(this.form, row)
    },
    deleteRole(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await reqRemoveRole(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getRoleList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    async grant(row) {
      Object.assign(this.form, row)
      const result = await reqAllPermission(row.id)
      if (result.code === 200) {
        this.menuList = result.data
        this.menuArr = this.filterMenuList(this.menuList, [])
      }
      this.drawer = true
    },
    filterMenuList(arr, initArr) {
      arr.forEach(item => {
        if (item.select && item.level === 4) {
          initArr.push(item.id)
        }
        if ( item.children && item.children.length > 0) {
          this.filterMenuList(item.children, initArr)
        }
      })
      return initArr
    },
    async confirm() {
      let roleId = this.form.id
      let checkedId = this.$refs.tree.getCheckedKeys()
      let halfId = this.$refs.tree.getHalfCheckedKeys()
      let permissionIdList = checkedId.concat(halfId)
      let permissionVo = {
        permissionIdList,
        roleId
      }
      const result = await reqSetPermission(permissionVo)
      if (result.code === 200) {
        this.drawer = false
        this.$message({
          showClose: true,
          message: '分配权限成功',
          type: 'success'
        });
        setTimeout(() => {
          window.location.reload()
        }, 3000)
        // window.location.reload()
      } else {
        this.$message({
          showClose: true,
          message: '分配权限失败',
          type: 'error'
        });
      }
    }
  },
  mounted() {
    this.getRoleList()
  }
}
</script>

<style lang="scss" scoped>
.search {
  height: 80px;
  margin-bottom: 6px;
}
.table {
  margin: 10px 0;
  height: 60%;
}
.demo-drawer {
  height: 100%;
  .demo-drawer__content {
    .el-tree {
      position: absolute;
      width: 100%;
      height: 80%;
      overflow-y: auto;
    }
    .demo-drawer__footer {
      position: fixed;
      bottom: 8px;
      right: 10px;
    }
  }
}
</style>