<template>
  <el-row :gutter="20">
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="o" class="card-message-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            New Visits
          </div>
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="xiaoxi1" class="card-message-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            New Message
          </div>
          <count-to :start-val="0" :end-val="9100" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="8" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-favor">
          <svg-icon icon-class="xiaoxi" class="card-message-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            New Favor
          </div>
          <count-to :start-val="0" :end-val="8998" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import SvgIcon from '../components/SvgIcon'
import CountTo from 'vue-count-to'
export default {
  name: 'PanelGroup',
  components: {
    SvgIcon,
    CountTo
  }
}
</script>

<style scoped lang="scss">
  .card-panel-col {
    margin-bottom: 20px;

    .card-panel {
      height: 108px;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      box-sizing: border-box;
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #2D8CF0;
        }
        .icon-favor {
          background: #f4516c;
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #2D8CF0;
      }
      .icon-favor {
        color: #f4516c;
      }
      .card-panel-icon-wrapper {
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-message-icon {
        font-size: 50px;
      }
      .card-panel-description {
        font-weight: bold;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          color: #666666;
          font-size: 20px;
        }
      }
    }

  }

</style>
