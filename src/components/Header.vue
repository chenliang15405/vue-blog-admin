<template>
  <div class="header">
    <div class="left">
      <div class="collapse-btn" @click="collapseChage">
        <svg-icon icon-class="gongneng1" class="icon" />
      </div>
      <div class="title word">
        <span>后台管理系统</span>
        <img v-if="showSideBarLogo" src="../assets/favicon.png" class="logo">
      </div>
    </div>
    <div class="right">
      <div class="btn-fullscreen" @click="handleFullScreen">
        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
          <svg-icon icon-class="box" class="fullscreen-icon" />
        </el-tooltip>
      </div>
      <div class="btn-message-tip">
        <div :class="messageNum > 0 ? 'red-point': ''" ></div>
        <el-tooltip class="btn-message-tip-icon" effect="dark" :content="messageNum ? `有${messageNum}条消息` :`消息中心`" placement="bottom">
          <svg-icon icon-class="o" class="fullscreen-icon" @click.native="messageTips"/>
        </el-tooltip>
      </div>
      <div class="user-avator">
        <img :src="avatar">
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
import { getBloggerInfo, getBloggerMessageNotify } from '@/api/user'

export default {
  name: 'Header',
  components: {
    SvgIcon
  },
  data() {
    return {
      fullscreen: false,
      username: '',
      avatar: '',
      messageNum: 0,
      messageList: []
    }
  },
  computed: {
    // 计算属性默认的是get方法 -- get(){} 就可以简化为 username(){}
    // 如果需要提供set方法，就需要给一个属性 showLogo: { get(){}, set(){} }
    loginname() {
      const loginname = this.$store.state.login.username
      // console.log(this.$store.getters.password)
      // const username = localStorage.getItem('login_usernmae')
      return loginname || '未知'
    },
    showSideBarLogo: {
      get() {
        return this.$store.getters.sidebarLogo
      }
    }
  },
  watch: {
    // 监听store中的数据是否改变 需要使用''包裹
    '$store.getters.messageNum'() {
      this.messageNum = this.$store.getters.messageNum
    }
  },
  mounted() {
    this.init()
    this.bloggerMessage()
  },
  methods: {
    async init() {
      try {
        const data = await getBloggerInfo(this.loginname)
        const { username, avatar } = data.data
        this.username = username
        this.avatar = avatar
        // console.log('getUserInfo: ', this.username, this.avatar)
      } catch (e) {
        console.log('getBloggerInfo error', e)
      }
    },
    async bloggerMessage() {
      const NOT_READ = 0
      try {
        const resp = await getBloggerMessageNotify(NOT_READ)
        if (resp.code === 20000) {
          this.handlerBloggerMessage(resp.data)
        }
      } catch (e) {
        console.log('bloggerMessage error', e)
      }
    },
    // 侧边栏折叠
    collapseChage() {
      let collapse = this.$store.getters.collapse
      collapse = !collapse
      this.$store.dispatch('home/collapseChage', collapse)
    },
    // 下拉菜单的选择命令
    async handleCommand(command) {
      if (command === 'logout') {
        // localStorage.removeItem('login_usernmae')
        await this.$store.dispatch('login/setSignOut') // 命令空间
        this.$router.replace('/login')
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
      this.$router.push({ path: '/bloggerMessage' })
    },
    handlerBloggerMessage(data) {
      this.messageNum = data.length
      this.messageList = data
      this.$store.dispatch('home/changeMessage', data.length)
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
    .word {
      display: flex;
      align-items: center;
    }
    .logo {
      margin-left: 20px;
      width: 50px;
      height: 50px;
    }
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
      position: relative;
    }
    .red-point {
      height: 8px;
      width: 8px;
      position: absolute;
      top: 2px;
      right: 3px;
      background-color: #f56c6c;
      border-radius: 50%;
      animation: buling 2s infinite linear;
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

  @keyframes buling {
    0% {
      transform: scale(1.0);
    }
    100% {
      transform: scale(1.1);
      opacity: 0;
    }
  }

</style>
