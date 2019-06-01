<template>
  <div class="user-container">
    <el-row class="search">
      <el-form :inline="true" :model="searchForm">
        <el-form-item>
          <el-input v-model="searchForm.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.role" placeholder="角色">
            <el-option label="管理员" value="admin" />
            <el-option label="游客" value="guest" />
            <el-option label="审批人" value="judge" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.status" placeholder="状态">
            <el-option label="可用" value="able" />
            <el-option label="小黑屋" value="unable" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="header-btn">
        <el-button round size="medium" @click="dialogFormVisible = true">新增</el-button>
      </div>
    </el-row>
    <el-row class="list-view">
      <el-table
        v-loading="listLoading"
        :data="userList"
        style="width: 100%"
        highlight-current-row
        fit
      >
        <el-table-column
          label="ID"
          prop="id"
          align="left"
          width="50px"
        />
        <el-table-column
          prop="username"
          label="姓名"
          align="center"
          width="80px"
        />
        <el-table-column
          prop="role"
          label="角色"
          align="center"
          width="100px"
        />
        <el-table-column
          prop="email"
          label="邮箱"
          align="center"
        />
        <el-table-column
          prop="datetime"
          label="创建日期"
          align="center"
        />
        <el-table-column
          prop="address"
          label="地址"
          align="center"
        />
        <el-table-column
          label="状态"
          align="center"
          width="80px"
        >
          <!--template的slot插槽，可以拿到当前row-->
          <template slot-scope="{ row }">
            <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary" class="edit-btn">edit</el-button>
            <el-button v-if="scope.row.status === true" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" class="black-house">&nbsp;delete&nbsp;&nbsp;&nbsp;</el-button>
            <el-button v-if="scope.row.status === false" size="mini" type="success" @click="handleRecover(scope.$index, scope.row)" class="out-house">available</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination  v-show="total>0" :total="total" :page.sync="page" :limit.sync="pageSize" @pagination="getList"></pagination>
    </el-row>

    <!--add user form dialog-->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="500px" class="dialog">
      <el-form :model="userForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="userForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="userForm.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="userForm.role" placeholder="请选择活动区域">
            <el-option label="ADMIN" value="ADMIN"></el-option>
            <el-option label="GUEST" value="GUEST"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="userForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="userForm.address" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormCancel">取 消</el-button>
        <el-button type="primary" @click="dialogFOrmSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getUserList } from '@/api/user'
import Pagination from '@/components/Pagination'

export default {
  name: 'User',
  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      searchForm: {
        username: '',
        role: '',
        status: ''
      },
      userForm: {
        id: '',
        username: '',
        role: '',
        nickname: '',
        email: '',
        address: ''
      },
      userList: [],
      listLoading: true,
      total: 0,
      page: 1,
      pageSize: 10,
      dialogFormVisible: false,
      formLabelWidth: '80px'
    }
  },
  created() {
    this.getUserData(this.page, this.pageSize)
  },
  methods: {
    onSubmit() {

    },
    getUserData(page, pageSize) {
      getUserList(page, pageSize).then(res => {
        this.listLoading = false
        this.userList = res.body
        this.total = res.total
      })
    },
    handleEdit(index, row) {
      this.userForm = row
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {

    },
    handleRecover(index, row) {

    },
    getList(val) {
      this.getUserData(val.page, val.pageSize)
    },
    dialogFOrmSubmit() {
      // TODO sumit form
      this.$message({
        showClose: true,
        message: '恭喜你，这是一条成功消息',
        type: 'success',
        center: true
      })
      this.dialogFormVisible = false
      this.userForm = {}
    },
    dialogFormCancel() {
      this.dialogFormVisible = false
      this.userForm = {}
    }
  }
}
</script>

<style>
  .dialog .el-form-item__content {
    width: 280px !important;
  }
</style>

<style scoped lang="scss">
  .user-container {
    padding: 10px;
    background-color: #fff;
    .search {
      margin: 10px 0 10px 10px;
      display: flex;
    }
    .el-icon-search {
      position: absolute;
      top: 50%;
      left: 5px;
      color: #fff;
      font-size: 18px;
      transform: translateY(-55%);
    }
    .el-button {
      span {
        margin-left: 30px;
      }
    }
    .header-btn {
      position: absolute;
      right: 50px;
    }

    .list-view {
      .black-house {
        width: 80px;
      }
      .out-house {
        width: 80px;
      }
    }

  }

</style>
