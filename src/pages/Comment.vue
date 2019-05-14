<template>
  <div class="comment-container">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="small" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-select v-model="select_state" placeholder="状态" class="handle-select mr10">
          <!--for each-->
          <el-option key="1" label="待审核" value="待审核"></el-option>
          <el-option key="2" label="通过" value="通过"></el-option>
          <el-option key="3" label="未通过" value="未通过"></el-option>
        </el-select>
        <el-input v-model="select_article" placeholder="Search 文章名称" class="handle-input mr10"></el-input>
        <el-input v-model="select_commenter" placeholder="Search 评论人" class="handle-input mr10"></el-input>
        <el-button type="default" size="medium" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="commentList"
        style="width: 100%"
        highlight-current-row
        fit
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="序号"
          prop="id"
          align="left"
          width="80px"
        />
        <el-table-column
          prop="comment_content"
          label="评论"
          align="center"
        />
        <el-table-column
          prop="commenter"
          label="评论人"
          align="center"
        />
        <el-table-column
          prop="article"
          label="文章"
          align="center"
        >
          <template slot-scope="scope">
            <a href="">{{ scope.row.article }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdate"
          label="创建日期"
          align="center"
        />
        <el-table-column
          prop="state"
          label="状态"
          align="center"
        >
          <!--template的slot插槽，可以拿到当前row-->
          <template slot-scope="{ row }">
            <el-tag :type="row.state | statusFilter">{{ row.state }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="text" class="pass" @click="handlePass(scope.$index, scope.row)">通过</el-button>
            <el-button size="mini" type="text" class="notpass" @click="handleNotPass(scope.$index, scope.row)">不通过</el-button>
            <el-button size="mini" type="text" class="delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getCommentData } from '@/api/comment'

export default {
  name: 'Comment',
  filters: {
    statusFilter(state) {
      const statusMap = {
        'pass': 'success',
        'nopass': 'danger',
        'judge': 'info'
      }
      return statusMap[state]
    }
  },
  data() {
    return {
      listLoading: true,
      commentList: [],
      pageQuery: {
        page: 1,
        pageSize: 10
      },
      select_state: '',
      select_article: '',
      select_commenter: ''
    }
  },
  created() {
    this.getCommentList(this.pageQuery.page, this.pageQuery.pageSize)
  },
  methods: {
    async getCommentList(page, pageSize) {
      try {
        const data = await getCommentData(page, pageSize)
        this.listLoading = false
        this.commentList = data.body
      } catch (e) {
        console.log(e)
      }
    },
    handlePass(index, row) {

    },
    handleNotPass(index, row) {

    },
    handleDelete(index, row) {

    },
    handleSelectionChange() {

    },
    search() {

    },
    delAll() {

    }
  }
}
</script>

<style scoped lang="scss">
  .comment-container {
    .container .handle-box {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .handle-select {
        width: 120px;
        margin: 0 20px;
      }
      .handle-input {
        width: 230px;
        margin-right: 20px;
      }

    }
  }

</style>
