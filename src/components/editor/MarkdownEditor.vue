<template>
  <div class="markdown-container">
    <mavon-editor
      ref=md
      @imgAdd="$imgAdd"
      @imgDel="$imgDel"
      @change="change"
      @save="save"
      :ishljs="true"
      :codeStyle="code_style"
      style="height: 100%"
    >
    </mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'MarkdownEditor',
  components: {
    mavonEditor
  },
  data() {
    return {
      content: '',
      code_style: 'github'
    }
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    // pos 文件名， $file 文件对象
    $imgAdd(pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      this.$axios({
        url: 'https://httpbin.org/post',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.md.$img2Url(pos, url)
      })
    },
    $imgDel(feilname) {
      // 删除文件回调事件

    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.content = render
    },
    save(value, render) {
      // ctrl + s 触发事件, 可以直接保存到vuex
      // value 单纯的文本, render 带有html标签的文本  -- 需要将html和value都保存到数据库中便于展示
      console.log('render', render)
    }
  }
}
</script>

<style scoped>
  .markdown-container {
    margin: 50px auto;
    height: 580px;
  }

</style>
