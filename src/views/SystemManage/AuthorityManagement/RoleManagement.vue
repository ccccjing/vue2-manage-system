<template>
  <div>
    <el-card class="search">
      <el-form inline>
        <el-form-item label="角色名称：">
          <el-input placeholder="请输入角色名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              size="medium"
            >搜索</el-button>
           <el-button size="medium">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" size="medium">添加角色</el-button>
      <el-table border :data="roleList" v-loading="loading">
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="角色名称" prop="roleName" width="160"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="160"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" width="160"></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template>
            <el-button type="success" size="mini" icon="el-icon-user">分配权限</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
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
  </div>
</template>

<script>
import {
  reqRoleList
} from '@/api/acl'
export default {
  name: 'RoleManagement',
  data () {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 10,
      roleList: [],
      loading: false
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
      const result = await reqRoleList(this.currentPage, this.pageSize)
      if (result.code === 200) {
        this.roleList = result.data?.records
        this.total = result.data?.total
      }
      this.loading = false
    }
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
</style>