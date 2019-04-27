<template>
  <div class="side-bar-container">
    <el-menu
      default-active="2"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
      :collapse="collapse"
      class="el-menu"
      :collapse-transition="false"
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <!--如果有第二层，则使用el-submenu-->
          <el-submenu :key="item.index" :index="item.index">
            <template slot="title">
              <i :class="item.icon" />
              <span slot="title">{{ item.title }}</span>
            </template>
            <!--遍历第二层菜单 -->
            <template v-for="subItem in item.subs">
              <!--如果还有第三层，则使用el-submenu-->
              <el-submenu v-if="subItem.subs" :key="subItem.index" :index="subItem.index">
                <template slot="title">
                  <i :class="subItem.icon" />
                  <span slot="title">{{ subItem.title }}</span>
                </template>
                <!--&lt;!&ndash;遍历第三层菜单，最多前套三层-->
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <!--如果没有第三层，只有2层，则直接展示，使用el-menu-item -->
              <el-menu-item v-else :key="subItem.index" :index="subItem.index">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <!--如果没有第二层，只有一个菜单，没有子菜单-->
          <el-menu-item :key="item.index" :index="item.index">
            <i :class="item.icon" />
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SIdeBar',
  data() {
    return {
      items: [
        {
          icon: 'el-icon-location',
          index: 'dashboard',
          title: '系统首页'
        },
        {
          icon: 'el-icon-menu',
          index: 'user',
          title: '用户管理'
        },
        {
          icon: 'el-icon-setting',
          index: 'label',
          title: '标签管理'
        },
        {
          icon: 'el-icon-edit',
          index: '3',
          title: '分类管理',
          subs: [
            {
              icon: 'el-icon-document',
              index: 'form',
              title: '基本表单'
            },
            {
              icon: 'el-icon-edit',
              index: '3-2',
              title: '三级菜单',
              subs: [
                {
                  index: 'editor',
                  title: '富文本编辑器'
                },
                {
                  index: 'markdown',
                  title: 'markdown编辑器'
                }
              ]
            },
            {
              index: 'upload',
              title: '文件上传'
            }
          ]
        },
        {
          icon: 'el-icon-sort',
          index: 'charts',
          title: '数据管理'
        },
        {
          icon: 'el-icon-rank',
          index: '6',
          title: '拖拽组件',
          subs: [
            {
              index: 'drag',
              title: '拖拽列表'
            },
            {
              index: 'dialog',
              title: '拖拽弹框'
            }
          ]
        },
        {
          icon: 'el-icon-warning',
          index: '7',
          title: '网站管理',
          subs: [
            {
              index: 'permission',
              title: '资源管理'
            },
            {
              index: '404',
              title: '404页面'
            }
          ]
        }
      ]
    }
  },
  computed: {
    collapse() {
      // const collapse = this.$store.state.home.collapse
      const collapse = this.$store.getters.collapse
      return collapse
    }
  }
}
</script>

<style scoped>
  .side-bar-container {
    width: 230px;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow: scroll;
    background-color: #f0f0f0;
  }
  /*去除滚动条占位*/
  .side-bar-container::-webkit-scrollbar{
    width: 0;
    height:0;
  }
  .el-menu {
    height:100%;
  }
</style>
