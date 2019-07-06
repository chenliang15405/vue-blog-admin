<template>
  <div class="text-container">
    <div class="box">
      <!-- 图片上传组件辅助
         :headers="header" 传token
      -->
      <el-upload
        class="avatar-uploader"
        name="file"
        :action="uploadImageUrl"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload"
      />
      <!-- vue-quill-editor 会将内容中的图片做base64编码处理，然后上传为文本，如果图片过大，可能会提示参数过长，
           后面可以优化为单独的上传图片到文件服务器
           Consolas和Monoca我觉得是windows上最好看的字体了
      -->
      <el-row v-loading="uploadLoading">
        <quill-editor
          ref="myTextEditor"
          v-model="data"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          @change="onEditorChange($event)"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'highlight.js/styles/monokai-sublime.css'

import { quillEditor, Quill } from 'vue-quill-editor'
import { ImageExtend } from 'quill-image-extend-module'
import ImageResize from 'quill-image-resize-module'
// import * as Quill from 'quill'
import hljs from 'highlight.js'

// quill编辑器的字体
/* var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif']
var Font = Quill.import('formats/font')
Font.whitelist = fonts // 将字体加入到白名单
Quill.register(Font, true)*/

Quill.register('modules/ImageExtend', ImageExtend)
// use resize module
Quill.register('modules/ImageResize', ImageResize)

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', 'medium', 'large', 'huge', 'false'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'font': [] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  ['clean'],
  ['link', 'image', 'video']
]

export default {
  name: 'RichTextEditor',
  components: {
    quillEditor
  },
  props: {
    content: {
      type: String
    }
  },
  data() {
    return {
      uploadImageUrl: 'http://localhost:9002/file/upload',
      header: '', // 传递token,
      uploadLoading: false, // 上传loading
      data: this.content || '',
      editorOption: {
        placeholder: 'Hello World',
        theme: 'snow', // 带工具类，bubble是不带工具栏的
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function(value) {
                if (value) {
                  alert('自定义图片')
                  // 触发input框选择图片文件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          },
          ImageResize: {},
          ImageExtend: {
            loading: true,
            name: 'file',
            action: 'http://localhost:9002/file/image/upload', // 服务器地址, 如果action为空，则采用base64插入图片
            headers: (xhr) => {
            },
            response: (res) => {
              console.log('ImageExtend', res)
              return res.data
            }
          },
          syntax: {
            highlight: text => {
              return hljs.highlightAuto(text).value // 这里就是代码高亮需要配置的地方
            }
          }
        }
      }
    }
  },
  methods: {
    onEditorBlur(editor) {
      // console.log('onEditorBlur', editor)
    },
    onEditorFocus(editor) {
      // console.log('onEditorFocus')
    },
    onEditorReady(editor) {
      // console.log('onEditorReady')
    },
    onEditorChange({ editor, html, text }) {
      console.log('onEditorChange', editor, html, text)
      // TODO 新增字段，存储html和txt, 文本用于搜索
      this.$emit('changeContent', html)
    },
    beforeUpload(response, file) {
      // 显示loading动画
      this.uploadLoading = true
    },
    uploadSuccess(response, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      const quill = this.$refs.myTextEditor.quill
      if (response.code === 20000 && response.data !== null) {
        // 获取光标所在位置
        const length = quill.getSelection().index
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', response.data)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.uploadLoading = false
    },
    uploadError(response, file) {
      // loading动画消失
      this.uploadLoading = false
      this.$message.error('图片插入失败')
    }
  }
}
</script>
<style>
  /*编辑器的高度*/
  .ql-container {
    height: 500px;
  }
  /*编辑器字体设置*/
  .ql-editor p {
    font-size: 16px;
    /*letter-spacing: 2px;*/
  }
  pre, code {
    font-family: Consolas;
  }
</style>

<style scoped>
  .text-container {
    margin-top: 30px;
  }
  box {
    font-family: Consolas;
  }
</style>
