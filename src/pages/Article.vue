<template>
  <div class="article-container">
    <div class="box">
      <el-row class="search-box">
        <el-form :inline="true" :model="searchForm">
          <el-form-item>
            <el-input v-model="searchForm.title" placeholder="文章" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.author" placeholder="作者">
              <el-option label="管理员" value="admin" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.status" placeholder="状态">
              <el-option label="已发布" value="0" />
              <el-option label="待审核" value="1" />
              <el-option label="草稿" value="2" />
              <el-option label="删除" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.orginal_status" placeholder="原创状态">
              <el-option label="原创" value="0" />
              <el-option label="转载" value="1" />
              <el-option label="翻译" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>

      <el-row>
        <el-table
          v-loading="listLoading"
          :data="articleList"
          style="width: 100%"
          fit
        >
          <!--详情框-->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="article-table-expand">
                <el-form-item label="分类：">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="原创状态：">
                  <el-tag :type="props.row.orginal_status | originnalStatusFilter" size="small">{{ props.row.orginal_status | originalStatusWordFilter }}</el-tag>
                </el-form-item>
                <el-form-item label="标签：">
                  <el-tag class="label-tag" size="small" v-for="(item, i) in props.row.label" :key="i">{{ item }}</el-tag>
                </el-form-item>
                <el-form-item label="摘要：">
                  <span>{{ props.row.summary }}</span>
                </el-form-item>
                <el-form-item label="创建时间：">
                  <span>{{ props.row.createdate }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <!--<el-table-column-->
          <!--label="序号"-->
          <!--prop="id"-->
          <!--align="left"-->
          <!--width="50"-->
          <!--/>-->
          <el-table-column
            label="标题"
            prop="title"
            align="center"
            width="300px"
          />
          <el-table-column
            label="作者"
            prop="author"
            align="center"
          />
          <el-table-column
            label="封面图"
            align="center"
          >
            <template slot-scope="{ row }">
              <img :src="row.img" alt="">
            </template>
          </el-table-column>
          <!--<el-table-column
            label="分类"
            prop="category"
            :filters="[{ text: '可用', value: '0' }, { text: '禁用', value: '1' }]"
            :filter-method="filterCategory"
            filter-placement="bottom-end"
            align="center"
          />-->
          <el-table-column
            label="阅读"
            prop="read"
            align="center"
          />
          <el-table-column
            label="点赞"
            prop="stars"
            align="center"
          />
          <el-table-column
            label="评论"
            prop="comment"
            align="center"
          />
          <!--<el-table-column
            label="原创状态"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-tag :type="row.orginal_status | originnalStatusFilter" size="small">{{ row.orginal_status | originalStatusWordFilter }}</el-tag>
            </template>
          </el-table-column>-->
          <el-table-column
            label="状态"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-tag :type="row.state | stateFilter" size="small">{{ row.state | stateWordFilter }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180px"
          >
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button v-if="scope.row.state === '0'" type="text" icon="el-icon-edit" size="small" @click="handleDraft(scope.$index, scope.row)">草稿</el-button>
              <el-button v-if="scope.row.state === '1' || scope.row.state === '2'" type="text" icon="el-icon-share" size="small" @click="handlePublish(scope.$index, scope.row)">发布</el-button>
              <el-button type="text" icon="el-icon-delete" size="small" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="pageQuery.total>0" :total="pageQuery.total" :page.sync="pageQuery.page" :limit.sync="pageQuery.pageSize" @pagination="getList" />
      </el-row>

    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getArticleList } from '@/api/article'

export default {
  name: 'Article',
  components: {
    Pagination
  },
  filters: {
    originnalStatusFilter(original_status) {
      const statusMap = {
        '0': 'success',
        '1': 'warning',
        '2': 'info'
      }
      return statusMap[original_status]
    },
    // originalStatusWordFilter(original_status) {
    //   const statusMap = {
    //     '0': '原创',
    //     '1': '转载',
    //     '2': '翻译'
    //   }
    //   return statusMap[original_status]
    // },
    stateFilter(stauts) {
      const statusMap = {
        '0': 'success', // 已发布
        '1': 'info', // 草稿
        '2': 'warning', // 待审核
        '3': 'danger' // 垃圾箱
      }
      return statusMap[status]
    },
    stateWordFilter(status) {
      const statusMap = {
        '0': '已发布', // 已发布
        '1': '草稿', // 草稿
        '2': '待审核', // 待审核
        '3': '垃圾箱' // 垃圾箱
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      searchForm: {
        article_title: '',
        author: null,
        status: null,
        orginal_status: null
      },
      articleList: [],
      pageQuery: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      listLoading: true
    }
  },
  created() {
    this.initData(this.pageQuery.page, this.pageQuery.pageSize)
  },
  methods: {
    async initData(page, pageSize) {
      try {
        const data = await getArticleList(page, pageSize)
        this.articleList = data.body
        this.listLoading = false
        this.pageQuery.total = data.total
      } catch (e) {
        console.log(e)
      }
    },
    getList({ page, pageSize }) {
      this.initData(page, pageSize)
    },
    search() {

    },
    filterCategory() {

    },
    filterStatus() {

    },
    handleEdit(index, row) {

    },
    handleDraft(index, row) {

    },
    handlePublish(index, row) {

    },
    handleDelete(index, row) {

    }
  }
}
</script>
<style>
  .el-form-item__label {
    color: #99a9bf !important;
  }
</style>

<style scoped lang="scss">
  .article-container {
    .box {
      padding: 20px 10px 20px 0;
      background: #fff;
    }
    .box .search-box {
      padding: 20px 20px 5px 20px;
    }

    .article-table-expand {
      font-size: 0;
      .el-form-item {
        width: 40%;
        margin-bottom: 0;
      }

      .label-tag {
        margin-right: 10px;
      }
    }

  }

</style>
