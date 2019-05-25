<template>
  <div class="text-container">
    <div class="box">
      <!-- vue-quill-editor 会将内容中的图片做base64编码处理，然后上传为文本，如果图片过大，可能会提示参数过长，
           后面可以优化为单独的上传图片到文件服务器
           Consolas和Monoca我觉得是windows上最好看的字体了
      -->
      <quill-editor
        ref="myTextEditor"
        v-model="data"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)"
      />
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'highlight.js/styles/monokai-sublime.css'

import { quillEditor } from 'vue-quill-editor'
import hljs from 'highlight.js'

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
      data: this.content || '',
      editorOption: {
        placeholder: 'Hello World',
        modules: {
          toolbar: [
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
          ],
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
      // console.log('onEditorChange', editor, html, text)
      this.$emit('changeContent', html)
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
