<template>
  <el-card style="marginBottom: 10px">
    <el-form inline>
      <el-form-item  label="一级分类">
        <el-select v-model="category1Id" :disabled="disabled">
          <el-option
            v-for="item in category1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="二级分类">
        <el-select v-model="category2Id" :disabled="disabled">
          <el-option
            v-for="item in category2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="三级分类">
        <el-select v-model="category3Id" :disabled="disabled">
          <el-option
            v-for="item in category3"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Category',
  props: ['disabled'],
  data() {
    return {
      category1Id: null,
      category2Id: null,
      category3Id: null,
    }
  },
  computed: {
    ...mapGetters(['category1', 'category2', 'category3'])
  },
  watch: {
    category1Id(id) {
      this.$store.commit('GET_CATEGORY1_ID', id)
      this.$store.dispatch('getCategory2', id)
      this.category2Id = null
    },
    category2Id(id) {
      this.$store.commit('GET_CATEGORY2_ID', id)
      this.$store.dispatch('getCategory3', id)
      this.category3Id = null
    },
    category3Id(id) {
      this.$store.commit('GET_CATEGORY3_ID', id)
    }
  },
  methods: {
    async getCategory1() {
      let result = await reqCategory1()
      console.log(result)
      if (result.code === 200) {
        this.category1 = result.data
      }
    },
    async getCategory2() {
      let result = await reqCategory1()
      console.log(result)
      if (result.code === 200) {
        this.category1 = result.data
      }
    },
    async getCategory3() {
      let result = await reqCategory1()
      console.log(result)
      if (result.code === 200) {
        this.category1 = result.data
      }
    },
  },
  mounted() {
    this.$store.dispatch('getCategory1')
  }
}
</script>

<style lang="scss" scoped>

</style>