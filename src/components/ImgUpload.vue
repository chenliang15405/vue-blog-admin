<template>
  <div class="imgUpload-container">
    <el-upload
      name="file"
      :data="dataObj"
      :multiple="false"
      :show-file-list="showList"
      :on-success="handleImageSuccess"
      class="image-uploader"
      drag
      :action="uploadImageUrl"
      :before-upload="uploadLimit"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>
    <div class="image-preview">
      <div v-show="imageUrl.length>1" class="image-app-preview">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
      <!--<div class="image-preview-name">
        <span>{{imageName}}</span>
      </div>-->
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
      uploadImageUrl: 'http://localhost:9002/file/upload',
      imageUrl: '',
      imageName: '',
      showList: false
    }
  },
  methods: {
    handleImageSuccess(response, file) {
      if (response.code === 20000) {
        this.$message.success('上传成功')
        this.imageUrl = response.data // 上传成功返回路径
        this.imageName = file.name // 上传返回名称
      } else {
        this.$message.error('上传失败，请重新上传图片')
      }
      this.$emit('imageUploadSuccess', this.imageUrl)
      console.log('imageUrl: ', this.imageUrl)
    },
    rmImage() {
      // 服务端删除文件
      this.$emit('goRmImage', this.imageUrl)
      this.imageUrl = ''
      this.showList = false
    },
    uploadLimit(file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10 // 大小限定为10M
      if (!isType) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
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
      margin-left: 150px;
      border-radius: 10px;
      position: relative;
      .image-app-preview {
        width: 200px;
        height: 180px;
      }
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
