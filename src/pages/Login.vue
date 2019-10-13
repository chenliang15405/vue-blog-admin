<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="username" class="input-item" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="password"
            @keyup.enter.native="submitForm('loginForm')"
          />
        </el-form-item>
        <!--<el-form-item prop="code">
          <el-input
            v-model="code"
            class="code"
            placeholder="code"
            @keyup.enter.native="submitForm('loginForm')"
          />
        </el-form-item>-->
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('loginForm')" :loading="loginLoading">登录</el-button>
        </div>
        <p class="login-tips">Tips : 请输入用户名和密码。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { Message } from 'element-ui'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginLoading: false,
      code: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
        /* code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]*/
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loginLoading = true
          const res = await login(this.loginForm)
          const data = res.data
          // 将数据存储到vuex
          if (data.flag && data.code === 20000) {
            // console.log('token ', res.headers.token)
            // TODO 如果需要做记住我的功能，需要将token存储到localstorage中
            this.$store.dispatch('login/setUserInfo', { username: this.loginForm.username, password: this.loginForm.password, role: data.data.role })
            this.$store.dispatch('login/setToken', res.headers)

            this.loginLoading = false
            this.$router.push('/')
            this.$message.success('Welcome To TangSong Blog!')
          } else {
            this.loginLoading = false
            Message({
              message: '用户名或密码错误',
              type: 'error',
              duration: 1000
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>

    .login-wrap {
        width: 100%;
        height: 100%;
        background: url('../assets/images/login-bg.jpg') center center no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 380px;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -65%);
        background:rgba(255,255,255,0.3);
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 20px;
        color: #fff;
    }
    .code {
        width: 60%;
    }
</style>
