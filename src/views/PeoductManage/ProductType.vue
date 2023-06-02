<template>
  <el-card class="box-card">
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus">添加产品</el-button>
    <!-- 展示表格 -->
    <el-table border :data="trademarkList">
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
        <template>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 7, 9]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { reqProduct } from "@/api/product";
export default {
  name: "ProductType",
  data() {
    return {
      currentPage: 1,
      pageSize: 3,
      total: 0,
      trademarkList: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTrademark()
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTrademark()
    },
    async getTrademark() {
      let result = await reqProduct(this.currentPage, this.pageSize);
      if (result.code === 200) {
        let { data } = result;
        this.total = data.total;
        this.trademarkList = data.records;
      }
    },
  },
  mounted() {
    this.getTrademark();
  },
};
</script>

<style lang="scss" scoped>
</style>