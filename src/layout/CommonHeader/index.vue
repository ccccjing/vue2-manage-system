<template>
  <div class="header">
    <i class="el-icon-menu" @click="toggleAside"></i>
    <i class="el-icon-full-screen" @click="fullScreen"></i>
    <el-popover
      placement="top-start"
      title="主题设置"
      width="200"
      trigger="hover"
    >
      <el-form>
        <el-form-item label="主体颜色">
          <el-color-picker v-model="colorMain" size="small"></el-color-picker>
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch v-model="dark" @change="changeDark"></el-switch>
        </el-form-item>
      </el-form>
      <i class="el-icon-setting" slot="reference"></i>
    </el-popover>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
         <el-avatar
         size='medium'
         :src="avatar"
         ></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{username}}</el-dropdown-item>
        <el-dropdown-item command="1">个人中心</el-dropdown-item>
        <el-dropdown-item command="2">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "CommonHeader",
  data () {
    return {
      colorMain: '#409EFF',
      dark: false
    }
  },
  computed: {
    ...mapGetters(['username', 'avatar'])
  },
  methods: {
    // 开关菜单栏
    toggleAside() {
      this.$store.dispatch('toggleAside')
    },
    // 全屏模式
    fullScreen() {
      let full = document.fullscreenElement
      if(!full) {
        document.documentElement.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    },
    // 退出登录
    async handleCommand(command) {
      if(command === '1') {
        this.$store.dispatch('userLogout')
      } else if(command === '2') {
        await this.$store.dispatch('userLogout')
        this.$router.push({
          path: '/login',
          query: {redirect: this.$route.path}
        })
      }
    },
    changeDark() {
      let html = document.documentElement
      this.dark ? html.className = 'dark' : html.className = ''
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  background-color: #999;
  color: #333;
  line-height: 60px;
  i {
    margin-left: 20px;
    cursor: pointer;
    color: #fff;
  }
  .username,
  .el-icon-full-screen,
  .el-icon-setting {
    position: absolute;
    top: 50%;
    right: 110px;
    transform: translateY(-50%);
  }
  .el-icon-setting {
    right: 80px
  }
  .el-dropdown {
    width: 64px;
    height: 60px;
    float: right;
    .el-avatar--medium {
      margin-top: 10px;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>