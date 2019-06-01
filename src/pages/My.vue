<template>
  <div class="my-container">
    <div class="left">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
          <!--<el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>-->
        </div>
        <div class="info">
          <div class="info-item-img">
            <img :src="cropImg" class="pre-img">
            <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage">
          </div>
          <div class="info-item">
            <span class="tip">用户名称:</span>
            <span>admin</span>
          </div>
          <div class="info-item">
            <span class="tip">昵称:</span>
            <span>nickname</span>
          </div>
          <div class="info-item">
            <span class="tip">用户邮箱:</span>
            <span>admin@admin.com</span>
          </div>
          <div class="info-item">
            <span class="tip">职业:</span>
            <span>full stack</span>
          </div>
          <div class="info-item">
            <span class="tip">安全设置:</span>
            <span>
              <a @click.stop="dialogPass = true">修改密码</a>&nbsp;
              <a @click.stop="dislogEmail = true">修改邮箱</a>
            </span>
          </div>
          <div class="info-item">
            <span class="tip">签名:</span>
            <span>this is a qianmin</span>
          </div>
        </div>
      </el-card>
    </div>

    <div class="right">
      <el-card shadow="always">
        <div slot="header" class="clearfix">
          <span>个人动态</span>
          <i class="el-icon-refresh" style="float: right; padding: 3px 0;font-size: 18px;" @click="refresh"></i>
        </div>
        <div class="behavior">
          <!--TODO 发布博客，评论等、消息等日志记录到这里-->
        </div>
      </el-card>
    </div>

    <!--dialogVisible-->
    <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="40%">
      <vue-cropper
        ref="cropper"
        :src="imgSrc"
        :ready="cropImage"
        :zoom="cropImage"
        :cropmove="cropImage"
        style="width:100%;height:300px;"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelCrop">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--dialogPass-->
    <el-dialog title="修改密码" :visible.sync="dialogPass" width="450px">
      <el-form :model="infoForm">
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input v-model="infoForm.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="infoForm.newPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="infoForm.newPassword" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPass = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </div>
    </el-dialog>

    <!--dislogEmail-->
    <el-dialog title="修改邮箱" :visible.sync="dislogEmail" width="450px">
      <el-form :model="infoForm">
        <el-form-item label="新邮箱" :label-width="formLabelWidth">
          <el-input v-model="infoForm.newEmail" autocomplete="off" style="width: 200px;margin-right:10px" />
          <el-button>获取验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-input v-model="infoForm.authCode" autocomplete="off" />
        </el-form-item>
        <el-form-item label="当前密码" :label-width="formLabelWidth">
          <el-input v-model="infoForm.password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dislogEmail = false">取 消</el-button>
        <el-button type="primary" @click="updateEmail">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  name: 'My',
  components: {
    VueCropper
  },
  data() {
    return {
      defaultSrc: require('../assets/avator.jpg'), // 使用require获取图片，或者直接import
      dialogVisible: false,
      imgSrc: '',
      cropImg: '',
      dialogPass: false,
      dislogEmail: false,
      infoForm: {
        newEmail: '',
        authCode: '',
        password: '',
        newPassword: ''
      },
      formLabelWidth: '80px'
    }
  },
  created() {
    this.cropImg = this.defaultSrc
  },
  methods: {
    cancelCrop() {
      this.dialogVisible = false
      this.cropImg = this.defaultSrc
    },
    setImage(e) {
      const file = e.target.files[0]
      if (!file.type.includes('image/')) {
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        this.dialogVisible = true
        this.imgSrc = event.target.result
        this.$refs.cropper && this.$refs.cropper.replace(event.target.result)
      }
      reader.readAsDataURL(file)
    },
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    updateEmail() {

    },
    updatePassword() {

    },
    refresh() {

    }
  }
}
</script>
<style>
  .cropper-view-box {
    border-radius: 50%!important;
  }
</style>

<style scoped lang="scss">
  $color-grey-light: #f0f3f4;
  $color-blue: #2196F3;

  .my-container {
    display: flex;
  }
  .left {
    width: 350px;
    margin:20px 20px 50px 0;
    color: #303132;
    font-size: 13px;
    i {
      width: 30px;
      height: 30px;
    }
    .info .info-item {
      border-bottom: 1px solid $color-grey-light;
      padding: 10px;
      display: flex;
      justify-content: space-between;
    }
    .info-item a {
      color: $color-blue;
      cursor: pointer;
    }
    .avatar-img {
      width: 100px;
      height: 100px;
    }
  }
  .info-item-img {
    position: relative;
    height: 120px;
    width: 120px;
    margin: 0 auto;
    border-radius: 50%;
    margin-bottom: 30px;
  }
  .pre-img {
    height: 100%;
    width: 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .crop-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-radius: 50%;
    cursor: pointer;
  }

  .right {
    flex: 1;
    margin:20px 10px 50px 0;
  }

</style>
