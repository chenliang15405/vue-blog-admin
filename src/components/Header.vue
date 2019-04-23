<template>
  <div class="header">
    <div class="left">
      <div class="collapse-btn" @click="collapseChage">
        <svg-icon icon-class="gongneng1" class="icon" />
      </div>
      <div class="title">
        <span>后台管理系统</span>
      </div>
    </div>
    <div class="right">
      <div class="btn-fullscreen" @click="handleFullScreen">
        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
          <svg-icon icon-class="box" class="fullscreen-icon"/>
        </el-tooltip>
      </div>
      <div class="btn-message-tip" @click="messageTips">
        <el-tooltip class="btn-message-tip" effect="dark" :content="message ? `有${message}条消息` :`消息中心`" placement="bottom">
          <svg-icon icon-class="o" class="fullscreen-icon" />
        </el-tooltip>
      </div>
      <div class="user-avator">
        <img src="../assets/images/img.jpg">
      </div>
      <div class="drop-menu">
        <el-dropdown class="user-name" trigger="click" placement="bottom" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}&nbsp;
            <svg-icon icon-class="xiaoxi1" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="" target="_blank">
              <el-dropdown-item>关于作者</el-dropdown-item>
            </a>
            <a href="" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

  </div>
</template>

<script>
import SvgIcon from './SvgIcon'

export default {
  name: 'Header',
  components: {
    SvgIcon
  },
  data() {
    return {
      fullscreen: false,
      message: 2
    }
  },
  computed: {
    username() {
      const username = this.$store.state.login.username
      console.log(this.$store.getters.password)
      // const username = localStorage.getItem('login_usernmae')
      return username || '未知'
    }
  },
  methods: {
    // 侧边栏折叠
    collapseChage() {
      // TODO 使用vuex进行保存状态
    },
    // 下拉菜单的选择命令
    async handleCommand(command) {
      if (command === 'logout') {
        // localStorage.removeItem('login_usernmae')
        await this.$store.dispatch('login/setSignOut') // 命令空间
        this.$router.push('/login')
      }
    },
    // 全屏处理
    handleFullScreen() {
      const element = document.documentElement
      if (this.fullscreen) {
        // 判断浏览器兼容性
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    // 消息提示
    messageTips() {
      // TODO 消息提示
    }
  }
}
</script>

<style scoped lang="scss">
  .header {
    height: 70px;
    width: 100%;
    color: #fff;
    font-size: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon {
    font-size: 22px;
    margin: 50px 20px;
  }
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
    .btn-fullscreen {
      width: 30px;
      text-align: center;
    }
    .btn-message-tip {
      margin: 0 10px 0 10px;
    }
    .fullscreen-icon {
      font-size: 22px;
    }
    .user-avator img {
      display: block;
      width:50px;
      height:50px;
      border-radius: 50%;
    }
    .drop-menu {
      margin: 0 30px 0 20px;
    }

  }

</style>
