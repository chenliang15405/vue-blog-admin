<template>
  <!-- 加上@dragover.prevent 阻止浏览器的默认拖拽打开图片时间，这样就可以直接将图片拖到编辑器自动上传
      DragDrop：拖放完成，也就是鼠标拖入对象并在拖放区域释放。
      DragEnter：拖放进入，也就是鼠标拖放对象进入拖放区域。
      DragLeave：离开拖放区域。
      DragOver：拖放对象悬浮于拖放区域，在拖放区域内移动时多次触发。
  -->
  <div class="markdown-container" @dragover.prevent>
    <div class="code_style_select">
      <el-select v-model="code_style" placeholder="代码风格">
        <el-option
          v-for="item in codeStyleList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <mavon-editor
      ref="md"
      :ishljs="true"
      :code-style="code_style"
      style="height: 100%"
      @imgAdd="$imgAdd"
      @imgDel="$imgDel"
      @change="change"
      @save="save"
    />
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const codeStyleList = [
  { label: 'github', value: 'github' },
  { label: 'idea', value: 'idea' },
  { label: 'monokai-sublime', value: 'monokai-sublime' },
  { label: 'atom-one-dark', value: 'atom-one-dark' },
  { label: 'atom-one-light', value: 'atom-one-light' },
  { label: 'brown-paper', value: 'brown-paper' },
  { label: 'vs2015', value: 'vs2015' },
  { label: 'xcode', value: 'xcode' },
  { label: 'tomorrow-night', value: 'tomorrow-night' }
]

/* TODO 目前目前的大小，只能通过写<img src="" width= height= style>来控制 查看其他插件来控制图片的大小*/
export default {
  name: 'MarkdownEditor',
  components: {
    mavonEditor
  },
  props: {
    contentStr: {
      type: String
    }
  },
  data() {
    return {
      content: this.contentStr || '',
      code_style: 'github',
      codeStyleList: codeStyleList
    }
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    // pos: 图片标志，第几个， $file 文件对象
    $imgAdd(pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      // 上传图片到服务器
      this.$axios({
        url: 'api/article/file/image/upload',
        method: 'post',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': this.$store.getters.token
        }
      }).then(res => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        const _res = res.data
        if (_res.code === 20000) {
          // 将上传之后的图片地址回显在编辑器中
          this.$refs.md.$img2Url(pos, _res.data)
        } else {
          this.$notify({
            title: '失败',
            message: _res.message,
            type: 'error'
          })
        }
      })
    },
    $imgDel(feilname) {
      // 删除文件回调事件，feilname是array第一个是图片访问URL，第二个是文件属性
      this.$emit('goRmImage', feilname[0])
    },
    change(value, render) {
      // value 是原始数字，
      // render 为 markdown 解析后的结果即html渲染
      // console.log('value', value)
      // console.log('render', render)
      this.content = render
      this.$emit('changeContent', { html: render, text: value })
    },
    save(value, render) {
      // ctrl + s 触发事件, 可以直接保存到vuex
      // value 单纯的文本, render 带有html标签的文本  -- 需要将html和value都保存到数据库中便于展示
      // 可以保存到localstroage或者vuex
      console.log('render', render)
    }
  }
}
</script>

<style>
  .el-input__inner {
    width: 100px;
    font-size: 12px;
  }

</style>
<style scoped>
  .markdown-container {
    margin: 50px auto;
    height: 580px;
  }
  .code_style_select {
    height: 10px;
    width: 100px;
    font-size: 10px;
    margin-bottom: 40px;
  }
</style>
