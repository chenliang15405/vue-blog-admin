<template>
  <div class="container">
    <el-tabs v-model="tabType">
      <el-tab-pane :label="`未读消息(${message.unread.length})`" name="first">
        <el-table :data="message.unread" :show-header="false" style="width: 100%">
          <el-table-column>
            <template slot-scope="scope">
              <span class="blogger-message-title">{{ scope.row | messageType }}</span>
            </template>
          </el-table-column>
          <el-table-column width="180">
            <template slot-scope="scope">
              <span class="fs">{{ scope.row.createDate | parseTime }}</span>
            </template>
          </el-table-column>
          <el-table-column width="120">
            <template slot-scope="scope">
              <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="handle-row">
          <el-button type="primary">全部标为已读</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="`已读消息(${message.read.length})`" name="second">
        <template v-if="tabType === 'second'">
          <el-table :data="message.read" :show-header="false" style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="blogger-message-title">{{ scope.row | messageType }}</span>
              </template>
            </el-table-column>
            <el-table-column width="150">
              <template slot-scope="scope">
                <span class="fs">{{ scope.row.createDate | parseTime }}</span>
              </template>
            </el-table-column>
            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="danger">删除全部</el-button>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane :label="`回收站(${message.recycle.length})`" name="third">
        <template v-if="tabType === 'third'">
          <el-table :data="message.recycle" :show-header="false" style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="blogger-message-title">{{ scope.row | messageType }}</span>
              </template>
            </el-table-column>
            <el-table-column width="150">
              <template slot-scope="scope">
                <span class="fs">{{ scope.row.createDate | parseTime }}</span>
              </template>
            </el-table-column>
            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button @click="handleRestore(scope.$index)">还原</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="danger">清空回收站</el-button>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getBloggerMessageNotify, updateBloggerMessageStatus } from '@/api/user'

const ARTICLE_FAVORITE_TYPE = 'favorite_article'
const COMMENT_FAVORITE_TYPE = 'favorite_comment'
const COMMETN_CONTENT_TYPE = 'comment'

const NOT_READ = 0
const READ = 1
const RECYCLE = 2

export default {
  name: 'BloggerMessage',
  filters: {
    messageType(row) {
      let title
      switch (row.type) {
        case ARTICLE_FAVORITE_TYPE:
          title = `【文章点赞】文章 ${row.blogTitle} 被点赞啦！`
          break
        case COMMENT_FAVORITE_TYPE:
          title = `【评论点赞】 ${row.blogTitle} 文章下的评论：'${row.commentContent}' 被点赞啦！`
          break
        case COMMETN_CONTENT_TYPE:
          title = `【有新的评论】 ${row.userName}在文章${row.blogTitle}新增一条评论${row.commentContent}`
          break
        default:
          console.log(row.type)
      }
      return title
    }
  },
  data() {
    return {
      tabType: 'first',
      list: [],
      message: {
        unread: [],
        read: [],
        recycle: []
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      // 未读消息
      try {
        const resp = await getBloggerMessageNotify()
        if (resp.code === 20000) {
          resp.data && resp.data.map(item => {
            if (item.status === NOT_READ) {
              this.message.unread.push(item)
            } else if (item.status === READ) {
              this.message.read.push(item)
            } else if (item.status === RECYCLE) {
              this.message.recycle.push(item)
            }
          })
        }
      } catch (e) {
        console.log('getBloggerMessageNotify（NOT_READ） error', e)
      }
    },
    async handleRead(index) {
      // const arr = this.message.unread.slice(index, index+1) // 返回只有一个元素的数组, 不会改变原数组
      const arr = this.message.unread.splice(index, 1) // 返回一个数组，会改变原数组
      // 拼接read
      this.message.read = [...arr, ...this.message.read]
      const id = arr[0].id
      this.updateMessageStatus(id, READ)
      this.$store.dispatch('home/changeMessage', this.message.unread.length)
    },
    handleDel(index) {
      const arr = this.message.read.splice(index, 1)
      // 拼接recycle
      this.message.recycle = [...arr, ...this.message.recycle]
      const id = arr[0].id
      this.updateMessageStatus(id, RECYCLE)
    },
    handleRestore(index) {
      const arr = this.message.recycle.splice(index, 1)
      this.message.unread = [...arr, ...this.message.unread]
      const id = arr[0].id
      this.updateMessageStatus(id, NOT_READ)
      this.$store.dispatch('home/changeMessage', this.message.unread.length)
    },
    async updateMessageStatus(id, status) {
      if (id) {
        try {
          const resp = await updateBloggerMessageStatus(id, status)
          if (resp.code === 20000) {
            this.$notify({
              title: '成功',
              message: resp.message,
              type: 'success',
              duration: 1000
            })
          } else {
            this.$notify({
              title: '失败',
              message: resp.message,
              type: 'error',
              duration: 1000
            })
          }
        } catch (e) {
          console.log('updateMessageStatus error', e)
        }
      }
    }
  }
}
</script>

<style scoped>
  .blogger-message-title {
    cursor: pointer;
    color: rgb(32, 160, 255);
    font-size: 12px;
    font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
  }
  .handle-row{
    margin-top: 30px;
  }
  .fs {
    font-size: 12px;
    font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
  }
</style>
