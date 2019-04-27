<template>
  <el-card shadow="hover">
    <schart class="line-chart" :type="type" canvas-id="line" :data="data" :options="options" />
  </el-card>
</template>

<script>
import Schart from 'vue-schart'

export default {
  name: 'ReadChart',
  components: {
    Schart
  },
  data() {
    return {
      type: 'line',
      data: [{
        name: '2018/09/04',
        value: 1083
      },
      {
        name: '2018/09/05',
        value: 941
      },
      {
        name: '2018/09/06',
        value: 1139
      },
      {
        name: '2018/09/07',
        value: 816
      },
      {
        name: '2018/09/08',
        value: 327
      },
      {
        name: '2018/09/09',
        value: 228
      },
      {
        name: '2018/09/10',
        value: 1065
      }
      ],
      options: {
        title: '最近七天用户阅读趋势',
        fillColor: '#FC6FA1',
        axisColor: '#3888fa',
        contentColor: '#EEEEEE',
        bgColor: '#fff',
        bottomPadding: 30,
        topPadding: 30
      }
    }
  }
}
</script>

<style scoped>
  .line-chart {
    width: 100%;
    height:300px;
  }
</style>
