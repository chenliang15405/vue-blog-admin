<template>
  <div class="category-container">
    <div class="container">
      <el-row class="search">
        <el-form :inline="true" :model="searchForm">
          <el-form-item>
            <el-input v-model="searchForm.category_name" placeholder="分类名称" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.state" placeholder="状态">
              <el-option label="可用" value="0" />
              <el-option label="小黑屋" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="header-btn">
          <el-button type="primary" icon="el-icon-plus" size="medium" @click="dialogFormVisible = true">新增</el-button>
        </div>
      </el-row>

      <!--表格-->
      <el-row>
        <el-button size="mini" @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button size="mini" @click="clearFilter">清除所有过滤器</el-button>
        <el-table
          v-loading="listLoading"
          ref="filterTable"
          :data="categoryList"
          style="width: 100%"
          fit
          highlight-current-row
        >
          <el-table-column
            prop="createdate"
            label="创建日期"
            sortable
            align="left"
            width="230px"
            column-key="createdate"
            :filters="[{text: '2014-09-04', value: '2014-09-04'}, {text: '1972-09-22', value: '1972-09-22'}]"
            :filter-method="filterDateHandler"
          >
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.createdate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="分类名称"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>创建人: {{ scope.row.username }}</p>
                <p>描述: {{ scope.row.description }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.category_name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            align="center"
            :filters="[{ text: '可用', value: '0' }, { text: '禁用', value: '1' }]"
            :filter-method="filterState"
            filter-placement="bottom-end"
            width="100px"
          >
            <!--template的slot插槽，可以拿到当前row-->
            <template slot-scope="{ row }">
              <el-tag :type="row.state | stateFilter">{{ row.state === '0'? '可用' : '禁用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
          >
            <template>
              <el-button size="mini" type="success" class="pass" @click="handlePass(scope.$index, scope.row)">ABLE</el-button>
              <el-button size="mini" type="danger" class="delete" @click="handleDelete(scope.$index, scope.row)">UNABLE</el-button>
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
import { getCategoryList } from '@/api/category'
export default {
  name: 'Category',
  components: {
    Pagination
  },
  filters: {
    stateFilter(state) {
      const stateMap = {
        '0': 'success',
        '1': 'waring'
      }
      return stateMap[state]
    }
  },
  data() {
    return {
      categoryList: [],
      pageQuery: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      searchForm: {
        category_name: '',
        state: ''
      },
      listLoading: true
    }
  },
  mounted() {
    this.getCategoryData(this.pageQuery.page, this.pageQuery.pageSize)
  },
  methods: {
    async getCategoryData(page, pageSize) {
      try {
        const data = await getCategoryList(page, pageSize)
        this.listLoading = false
        this.categoryList = data.body
        this.pageQuery.total = this.categoryList.length
      } catch (e) {
        console.log(e)
      }
    },
    getList({ page, pageSize }) {
      console.log(page)
      console.log(pageSize)
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('createdate')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    filterState(value, row, column) {
      return row.state === value
    },
    filterDateHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    search() {

    }
  }
}
</script>

<style scoped lang="scss">
  .search {
    display: flex;

    .header-btn {
      margin-left: 30px;
    }
  }
</style>
