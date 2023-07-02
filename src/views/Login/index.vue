<template>
  <div class="login_contain">
    <el-row>
      <el-col :span="12" :xs="0">&nbsp;;</el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
        >
          <h1>Hello</h1>
          <h2>欢迎使用管理系统</h2>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              prefix-icon="el-icon-lock"
              show-password
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              @click="login"
              :loading="isLoading"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Notification } from 'element-ui'
import { getTime } from '@/utils/time'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if(value.length >= 5) {
        callback()
      } else {
        callback(new Error('账号长度至少为5位'))
      }
    };
    const validatePassword = (rule, value, callback) => {
      if(value.length >= 6) {
        callback()
      } else {
        callback(new Error('密码长度至少6位'))
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'atguigu123'
      },
      isLoading: false,
      rules: {
        username: { validator: validateUsername, trigger: 'change' },
        password: { validator: validatePassword, tregger: 'change' }
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.isLoading = true
          try {
            await this.$store.dispatch('userLogin', this.loginForm)
            let redirect = this.$route.query.redirect
            this.$router.push({path: redirect || '/'})
            Notification({
              title: `Hi，${getTime()}好呀！`,
              type: 'success',
              message: '欢迎回来',
              duration: 3000
            })
            this.isLoading = false
          } catch(error) {
            Notification({
              title: '失败',
              type: 'error',
              message: error.message,
              duration: 3000
            })
            this.isLoading = false
          }
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.login_contain {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/login.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 20vh;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>