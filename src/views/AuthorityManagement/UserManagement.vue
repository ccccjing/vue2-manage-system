<template>
  <div>
    <el-card class="search">
      <el-form inline>
        <el-form-item label="用户名称：">
          <el-input
            placeholder="请输入用户名称"
            size="medium"
            v-model="keyword"
            clearable
          ></el-input>
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
      <el-button
        type="primary"
        size="medium"
        @click="addUser"
        v-isTrue="`btn.User.add`"
      >添加</el-button>
      <el-button
        type="danger" 
        size="medium"
        :disabled="!multipleSelection.length>0"
        @click="deleteUsers"
        v-isTrue="`btn.User.remove`"
      >批量删除</el-button>
      <el-table
        border
        style="margin: 10px 0;"
         max-height="310"
        :data="userData" 
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="用户名字" prop="username"></el-table-column>
        <el-table-column label="用户名称" prop="name"></el-table-column>
        <el-table-column label="用户角色" width="160" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" width="160" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" width="160" prop="updateTime"></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button 
              type="success"
              size="mini"
              icon="el-icon-user"
              @click="allotRole(scope.row)"
              v-isTrue="`btn.User.assgin`">分配角色</el-button>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editUser(scope.row)"
              v-isTrue="`btn.User.update`">编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteUser(scope.row)"
              v-isTrue="`btn.User.remove`">删除</el-button>
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
    <el-drawer
      :title="isAdd ? '添加用户' : '修改用户'"
      :visible.sync="drawer"
      custom-class="drawer"
    >
       <div class="drawer__content">
        <el-form :model="userParams" :rules="rules" ref="formRef">
          <el-form-item label="用户名字:" :label-width="formLabelWidth" prop="username">
            <el-input placeholder="请输入用户名字" v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="用户名称:" :label-width="formLabelWidth" prop="name">
            <el-input placeholder="请输入用户名称" v-model="userParams.name"></el-input>
          </el-form-item>
          <el-form-item v-if="isAdd" label="用户密码:" :label-width="formLabelWidth" prop="password">
            <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
          </el-form-item>
        </el-form>
        <div class="drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </div>
    </el-drawer>
    <el-drawer
      title="分配角色(职位)"
      :visible.sync="drawer1"
      custom-class="drawer"
    >
       <div class="drawer__content">
        <el-form>
          <el-form-item label="用户名字:" :label-width="formLabelWidth">
            <el-input :placeholder="userParams.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="职位列表:" :label-width="formLabelWidth">
            <template>
              <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <el-checkbox-group v-model="userRole" @change="handleCheckedRoleChange">
              <el-checkbox
                v-for="(role, index) in allRole"
                :label="role.id"
                :key="index"
              >{{role.roleName}}</el-checkbox>
            </el-checkbox-group>
            </template>
          </el-form-item>
        </el-form>
        <div class="drawer__footer">
          <el-button @click="drawer1 = false">取 消</el-button>
          <el-button type="primary" @click="confirmUserRole">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqRemoveUsers
} from '@/api/acl'

export default {
  name: 'User',
  data () {
    const validatorUsername = (rule, value, callback) => {
      if (value.trim().length >= 5) {
        callback()
      } else {
        callback(new Error('用户名至少5位'))
      }
    }
    const validatorName = (rule, value, callback) => {
      if (value.trim().length >= 5) {
        callback()
      } else {
        callback(new Error('用户名称至少5为'))
      }
    }
    const validatorPassword = (rule, value, callback) => {
      if (value.trim().length >= 6) {
        callback()
      } else {
        callback(new Error('用户密码至少6位'))
      }
    }
    return {
      currentPage: 1,
      pageSize: 5,
      userData: [],
      total: 0,
      loading: false,
      drawer: false,
      drawer1: false,
      formLabelWidth: '90px',
      isAdd: true,
      checkAll: false,
      isIndeterminate: true,
      userParams: {
        username: '',
        name: '',
        password: ''
      },
      rules: {
        username: { required: true, trigger: 'blur', validator: validatorUsername },
        name: { required: true, trigger: 'blur', validator: validatorName },
        password: { required: true, trigger: 'blur', validator: validatorPassword}
      },
      userRole: [],
      allRole: [],
      multipleSelection: [],
      keyword: ''
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1
      this.pageSize = val
      this.getUserData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getUserData()
    },
    // 获取用户
    async getUserData() {
      this.loading = true
      const result = await reqUserInfo(this.currentPage, this.pageSize, this.keyword)
      if (result.code === 200) {
        this.userData = result.data.records
        this.total = result.data.total
      }
      this.loading =false
    },
    // 添加用户
    addUser() {
      this.userParams = {
        username: '',
        name: '',
        password: ''
      }
      this.drawer = true
      this.isAdd = true
      this.$nextTick(() => {
        this.$refs.formRef.resetFields()
      })
    },
    // 编辑用户
    editUser(row) {
      this.drawer = true
      this.isAdd = false
      this.$nextTick(() => {
        this.$refs.formRef.resetFields()
        Object.assign(this.userParams, row)
      })
    },
    // 取消
    cancelForm() {
      this.drawer = false
    },
    // 确定
    confirm() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          const result = await reqAddOrUpdateUser(this.userParams)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: this.userParams.id ? '修改成功' : '添加成功'
            })
            this.drawer = false
            this.currentPage = this.userParams.id ? this.currentPage : this.currentPage = 1
            this.getUserData()
            // 重载
            window.location.reload()
          } else {
            this.$message({
              type: 'error',
              message: this.userParams.id ? '修改失败' : '添加失败'
            })
          }
        } else {
          return false;
        }
      });
    },
    // 角色信息
    async allotRole(row) {
      Object.assign(this.userParams, row)
      const result = await reqAllRole(row.id)
      if (result.code === 200) {
        this.allRole = result.data?.allRolesList
        this.userRole = result.data?.assignRoles?.map(item => item.id)
        this.drawer1 = true
      }
      console.log(this.userRole)
    },
    // 选中所有
    handleCheckAllChange(val) {
      this.userRole = val ? this.allRole.map(item => item.id) : [];
      this.isIndeterminate = false;
    },
    handleCheckedRoleChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allRole.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allRole.length;
    },
    // 修改用户角色
    async confirmUserRole() {
      let data = {
        userId: this.userParams.id,
        roleIdList: this.userRole
      }
      const result = await reqSetUserRole(data)
      if (result.code === 200) {
        this.$message({
          message: '分配角色成功',
          type: 'success'
        })
        this.drawer1 = false
        this.getUserData()
      } else {
        this.$message({
          message: '分配角色失败',
          type: 'error'
        })
      }
    },
    // 删除用户
    deleteUser(row) {
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await reqRemoveUser(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getUserData()
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
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量删除用户
    deleteUsers() {
      this.$confirm('此操作将删除所有选中用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let idList = this.multipleSelection.map(item => item.id)
        const result = await reqRemoveUsers(idList)
        console.log(result)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getUserData()
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
      })
    },
    // 搜索用户
    search() {
      this.getUserData()
    },
    // 重置
    reset() {
      this.keyword = ''
      this.getUserData()
    }
  },
  mounted() {
    this.getUserData()
  }
}
</script>

<style lang="scss" scoped>
.search {
  height: 80px;
  margin-bottom: 6px;
}
.drawer__content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  form {
    flex: 1;
  }
}
.drawer__footer {
  display: flex;
  button {
    flex: 1;
  }
  // position: absolute;
  // bottom: 60px;
  // right: 10px;
}
</style>