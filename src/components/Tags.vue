<template>
  <div v-if="showTags" class="tags-container">
    <ul>
      <li v-for="(item,index) in tagsList" :key="index" class="tags-li" :class="{'active': isActive(item.path)}">
        <router-link :to="item.path" class="tags-li-title">
          {{ item.title }}
        </router-link>
        <span class="tags-li-icon"><i class="el-icon-close" /></span>
      </li>
    </ul>
    <div class="tags-manage">
      <el-dropdown trigger="hover" @command="handleCommand">
        <span class="el-dropdown-link">
          标签选项<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="others">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  data() {
    return {
      tagsList: []
    }
  },
  computed: {
    showTags() {
      return this.tagsList || false
    }
  },
  watch: {
    // 监听路由是否改变，将点击的路由设置到tagsList中
    $route(newValue, oldValue) {
      this.setTags(newValue)
    }
  },
  created() {
    // 将当前点击的标签到tagslist中
    this.setTags(this.$route)
    // TODO this.$ruter 标示全局的vue-router对象 用来跳转路由， this.$route 标示跳转的路由对象
  },
  methods: {
    setTags(route) {
      // 判断当前tagsList中是否有这个路由
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath
      })
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift()
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        })
      }
    },
    isActive(path) {
      return path === this.$route.fullPath
    },
    closeAllTags() {
      this.tagsList.length = 0
      this.$router.push('/')
    },
    closeOthersTags() {
      const currTag = this.tagsList.filter(item => {
        return this.$route.fullPath === item.path
      })
      this.tagsList = currTag
    },
    handleCommand(command) {
      command === 'all' ? this.closeAllTags() : this.closeOthersTags()
    }
  }
}
</script>

<style scoped lang="scss">
  .tags-container {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    box-shadow: 0 5px 10px #ddd;
    ul {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      width: 100%;

      .tags-li {
        font-size: 12px;
        color: #666;
        border: 1px solid #e9eaec;
        background: #fff;
        line-height: 20px;
        padding: 2px 10px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        margin: 0 5px 0 3px;
        -webkit-transition: all 0.3s ease-in;
        -moz-transition: all 0.3s ease-in;
        -ms-transition: all 0.3s ease-in;
        -o-transition: all 0.3s ease-in;
        transition: all 0.3s ease-in;
      }

      .tags-li.active {
        color: #fff;
      }
      .tags-li.active .tags-li-title {
        color: #fff;
      }

      .tags-li-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #666;
      }
      .tags-li-icon {
        color: #666;
      }

    }

    .tags-manage {
      font-size: 12px;
      display: flex;
      width: 100px;
      z-index: 2;
    }

  }

</style>
