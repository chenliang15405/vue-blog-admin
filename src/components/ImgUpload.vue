<template>
  <div class="imgUpload-container">
    <el-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="showList"
      :on-success="handleImageSuccess"
      class="image-uploader"
      drag
      action="https://httpbin.org/post"
      :before-upload="uploadLimit"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>
    <div class="image-preview image-app-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgUpload',
  data() {
    return {
      dataObj: {

      },
      imageUrl: '',
      showList: false
    }
  },
  methods: {
    handleImageSuccess(response, file) {
      console.log(file)
      this.imageUrl = response.files.file
      console.log(this.imageUrl)
    },
    rmImage() {
      // TODO 去服务端删除文件
      this.imageUrl = ''
      this.showList = false
    },
    uploadLimit(file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isType) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isType && isLt10M
    }
  }
}
</script>

<style scoped lang="scss">
  .imgUpload-container {
    display: flex;
    margin-top: 20px;
    .image-uploader {
      margin-left: 10px;
    }
    .image-preview {
      width: 200px;
      height: 180px;
      border: 1px dashed #ccc;
      margin-left: 200px;
      border-radius: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      bottom: 3px;
      left: 6px;
      font-size: 18px;
    }
  }

</style>
