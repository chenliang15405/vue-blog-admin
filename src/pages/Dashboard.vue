<template>
  <div class="dashboard-container">
    <github-corner class="github-corner" />

    <el-row type="flex" :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20">
          <div class="user-info">
            <img :src="avatar" class="user-avator" alt="">
            <div class="user-info-cont">
              <div class="user-info-name">{{ username }}</div>
              <div>{{ role }}</div>
            </div>
          </div>
          <div class="user-info-list"><span>上次登录时间：2018-01-01</span></div>
          <div class="user-info-list"><span>上次登录地点：上海</span></div>
        </el-card>

        <el-card shadow="hover" class="mgb20">
          <div slot="header" class="clearfix">
            <span>语言详情</span>
          </div>
          <div class="progress">
            Vue
            <el-progress :text-inside="true" :stroke-width="15" :percentage="0" class="progress-item" />
            JavaScript
            <el-progress :text-inside="true" :stroke-width="15" :percentage="70" class="progress-item" />
            CSS
            <el-progress :text-inside="true" :stroke-width="15" :percentage="100" status="success" />
            <!--<el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>-->
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">

        <panel-group />

        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <line-chart :chart-data="lineChartData" />
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <todo-list />
      </el-col>

      <el-col :span="16">
        <read-chart />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from '../components/PanelGroup'
import LineChart from '../components/charts/LineChart'
import ReadChart from '../components/charts/ReadChart'
import TodoList from '../components/todo/TodoList'
import GithubCorner from '../components/GithubCorner'

import { getBloggerInfo } from '../api/user'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  }
}

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart,
    ReadChart,
    TodoList,
    GithubCorner
  },
  mounted() {
    this.init()
  },
  data() {
    return {
      username: this.$store.state.login.username,
      role: this.$store.getters.role,
      lineChartData: lineChartData.newVisitis,
      avatar: ''
    }
  },
  methods: {
    async init() {
      console.log(this.$store.getters.role)
      try {
        const data = await getBloggerInfo(this.$store.state.login.username)
        const { username, avatar } = data.data
        this.username = username
        this.avatar = avatar
        // console.log('getUserInfo: ', this.username, this.avatar)
      } catch (e) {
        console.log('getUserInfo error', e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .dashboard-container {
    margin: 10px 10px 50px 0;
  }
  .github-corner {
    position: absolute;
    top: 30px;
    right: 0;
    border: 0;
    z-index: 1;
  }
  .user-info {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #ccc;
    padding-bottom: 20px;
    margin-bottom: 20px;
    .user-avator {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      margin-left: 20px;
    }
    .user-info-cont {
      padding-left: 50px;
      flex: 1;
      font-size: 14px;
      color: #999;
    }
    .user-info-cont div:first-child {
      font-size: 30px;
      color: #222;
    }
  }
  .user-info-list span {
    font-size: 14px;
    color: #999;
  }
  .progress {
    font-size: 14px;
    .progress-item {
      margin-bottom:10px;
    }
  }

</style>
