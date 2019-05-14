<template>
  <div class="table">
    <!--<div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
      </el-breadcrumb>
    </div>-->
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="small" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-select v-model="select_type" placeholder="类型" class="handle-select mr10">
          <!--for each-->
          <el-option key="1" label="后端" value="后端"></el-option>
          <el-option key="2" label="前端" value="前端"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="Search 标签名称" class="handle-input mr10"></el-input>
        <el-button type="primary" size="medium" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table :data="labelList" v-loading="listLoading" border fit highlight-current-row style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="labelName"
          label="标签名称"
          sortable
        >
          <template slot-scope="{ row }">
            <el-tag :type="row | labelFilter" size="small">{{ row.labelName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createdate"
          label="创建日期"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="updatedate"
          label="更新日期"
          align="center"
          :formatter="formatter"
        >
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
          align="center"
        >
          <!--template的slot插槽，可以拿到当前row-->
          <template slot-scope="{ row }">
            <el-tag :type="row.status | statusFilter" size="small">{{ row.status | statusWordFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" size="small" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>

<script>
import { getLabelList } from '@/api/label'

export default {
  name: 'Label',
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    },
    labelFilter(row) {
      // TODO label name
      // console.log(row)  通过不同的type设置不同的tag
    }
  },
  data() {
    return {
      labelList: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        pageSize: 10
      },
      sortable: null,
      select_type: null,
      select_word: ''
    }
  },
  created() {
    this.getLabelList(this.listQuery.page, this.listQuery.pageSize)
  },
  methods: {
    async getLabelList(page, pageSize) {
      await getLabelList(page, pageSize).then(res => {
        this.listLoading = false
        this.labelList = res.body
      })
    },
    formatter(row, column) {
      return row.updatedate
    },
    delAll() {

    },
    search() {

    },
    handleSelectionChange() {

    },
    handleEdit(index, row) {

    },
    handleDelete(index, row) {

    }
  }

}
</script>

<style scoped lang="scss">
  .container {
    .handle-box {
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
    .red {
      color: #ff0000;
    }
  }

</style>
