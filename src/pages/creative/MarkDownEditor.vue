<template>
  <div class="creative-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <el-row>
        <el-col :span="24">
          <el-form-item style="margin: 20px 20px 40px 0" prop="title">
            <span :class="{focusTitle : postForm.title.length > 0 }" class="hideTitle">标题</span>
            <input v-model="postForm.title" type="text" class="title-input" placeholder="标题" required>
          </el-form-item>

          <el-form-item style="margin-bottom: 40px;" label="摘要" label-width="45px" prop="summary">
            <el-input v-model="postForm.summary" :rows="2" type="textarea" class="article-summary" autosize placeholder="请输入文章摘要" />
            <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}/100 字</span>
          </el-form-item>

          <el-row class="row2">
            <!--<el-col :span="6">
              <el-form-item style="margin-bottom: 40px;" label="作者" prop="author">
                <el-select v-model="postForm.author" :remote-method="getRemoteUserList" :loading="loading" clearable filterable default-first-option remote placeholder="搜索用户">
                  <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>-->

            <el-col :span="12">
              <el-form-item style="margin-left: -10px" label="发布时间" prop="createdate">
                <el-date-picker v-model="postForm.createdate" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <span class="face-image">封面图：</span>
              <img-upload @imageUploadSuccess="imageUploadSuccess" @goRmImage="goRmImage" />
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item prop="content">
                <markdown-editor @goRmImage="goRmImage" @changeContent="changeContent"></markdown-editor>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <article-tag
                :tagslist="postForm.labelList"
                @addTag="addTag"
                @removeTag="removeTag"
              />
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <article-category
                :category-list="cateList"
                @handleChecked="handleCateChecked"
                @createCate="createCate"
                @removeCate="removeCate"
              />
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div class="article-type">
                <span class="title">文章类型：</span>
                <el-select v-model="postForm.type" placeholder="请选择">
                  <el-option
                    v-for="item in articleType"
                    :key="item"
                    :label="item | originalStatusWordFilter"
                    :value="item"
                  />
                </el-select>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-switch
                v-model="postForm.ispublic"
                style="display: block;width: 130px;"
                active-color="#13ce66"
                inactive-color="#ccc"
                inactive-text="私密文章："
              />
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div class="btn-box">
                <el-button type="danger" plain class="btn" @click="submitForm">发布博客</el-button>
                <el-button type="success" plain class="btn" @click="saveDraft">保存草稿</el-button>
                <el-button type="info" plain class="btn" @click="goBack">返回</el-button>
              </div>
            </el-col>
          </el-row>

        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/editor/MarkdownEditor'
import ImgUpload from '@/components/ImgUpload'
import ArticleTag from '@/components/ArticleTag'
import ArticleCategory from '@/components/ArticleCategory'
import { getAllUser } from '@/api/user'
import { createArticle, createArticleDraft, deleteImageFile } from '../../api/article'

const ARTICLE_TYPE = ['0', '1', '2']

export default {
  name: 'MarkDownEditor',
  components: {
    MarkdownEditor,
    ImgUpload,
    ArticleTag,
    ArticleCategory
  },
  data() {
    return {
      postForm: {
        title: '',
        summary: '',
        author: '',
        createdate: new Date(),
        image: '',
        content: '',
        textcontent: '',
        categoryid: '',
        categoryName: '',
        labelList: [],
        type: '',
        ispublic: false,
        state: '0'
      },
      tagsList: [],
      cateList: [],
      userListOptions: [],
      contentShortLength: 0,
      loading: false,
      articleType: ARTICLE_TYPE,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        /* author: [
          { required: true, message: '请选择作者', trigger: 'blur' }
        ],*/
        createdate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请创作文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'postForm.summary'(old, newVal) {
      this.contentShortLength = newVal.length + 1
    }
  },
  methods: {
    async getRemoteUserList(query) {
      if (query !== '') {
        this.loading = true
        // search userList
        const data = await getAllUser()
        const list = data.data.data.map(item => {
          return item.username
        })
        this.loading = false
        this.userListOptions = list // TODO 需要统一为data
      }
    },
    changeContent({ html, text }) {
      this.postForm.content = html
      this.postForm.textcontent = text
      console.log('html', html)
      console.log('text', text)
    },
    addTag(val) {
      this.tagsList.push(val)
    },
    removeTag(array) {
      this.tagsList = array
    },
    handleCateChecked(checkedList) {
      this.cateList = checkedList
      this.postForm.categoryid = checkedList[0]
    },
    createCate(val) {
      this.postForm.categoryName = val
    },
    removeCate(array) {
      // this.cateList = array
      this.postForm.categoryName = '' // 针对一个分类
    },
    imageUploadSuccess(url) {
      this.postForm.image = url
    },
    async goRmImage(url) {
      const resp = await deleteImageFile(url)
      console.log('rmImage', resp)
      this.$notify({
        title: '成功',
        message: resp.message,
        type: resp.code === 20000 ? 'success' : 'warning'
      })
    },
    submitForm() {
      // 发布博客
      this.$refs['postForm'].validate(async(valid) => {
        if (valid) {
          const flag = this.validateProps()
          if (flag) {
            // 开始Loading
            const loading = this.$loading({
              lock: true,
              text: 'Loading...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
              fullscreen: false
            })

            try {
              // 提交数据
              this.postForm.categoryid = this.cateList[0] // 获取categoryid
              // 处理tagList
              this.postForm.labelList = this.tagsList.map(item => {
                return item.name
              })

              const resp = await createArticle(this.postForm)
              // $nextTick 就是延迟一段时间执行一段代码，如果对于dom的操作是等待dom更新之后，再执行里面的代码，适合使用
              this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loading.close()
              })
              // 提示成功
              if (resp.flag && resp.code === 20000) {
                this.$notify({
                  title: '成功',
                  message: '文章发布成功',
                  type: 'success'
                })
                // TODO 跳转文章发布成功页面，并可以跳转到web或者返回
              } else {
                this.$message.error('文章发布失败')
              }
            } catch (e) {
              loading.close()
              console.log(e)
              this.$message.error(`提交数据失败，系统异常`)
            }
          }
        } else {
          console.log('请填写信息！')
          return false
        }
      })
    },
    saveDraft() {
      // 直接保存为草稿
      try {
        this.postForm.state = '1' // state 1 为草稿
        this.postForm.type = '1' // 草稿
        const resp = createArticleDraft(this.postForm)
        console.log(resp)
        if (resp.flag && resp.code === 20000) {
          this.$notify({
            title: '保存成功',
            message: '文章已经保存为草稿',
            type: 'success'
          })
        }
      } catch (e) {
        console.log(e)
        this.$notify({
          title: '提示',
          message: '保存草稿失败，系统异常',
          type: 'error',
          duration: 2000
        })
      }
    },
    goBack() {
      this.$router.go(-1)
      //  this.$route 可以拿到路由传递的参数以及meta和name
      //  this.$router 是路由的跳转对象
    },
    validateProps() {
      let flag = true
      if (!this.postForm.content) {
        flag = false
        this.$message.warning('请填写博客内容')
      } else if (!this.postForm.categoryName && !this.postForm.categoryid) {
        flag = false
        this.$message.warning('请选择博客分类')
      } else if (this.tagsList.length === 0) {
        flag = false
        this.$message.warning('请设置博客标签')
      } else if (!this.postForm.title) {
        flag = false
        this.$message.warning('请填写标题')
      } else if (!this.postForm.type) {
        flag = false
        this.$message.warning('请选择文章类型')
      }
      return flag
    }
  }

}
</script>

<style>
  .el-switch__label.is-active {
    color: #000;
  }
</style>

<style scoped lang="scss">

  $font-size-base: 16px;
  $color-black: black;
  $color-grey-light: #acacac;
  $apixel: 1px;
  $color-blue: #2196F3;

  $spacer: 12px;
  $transition: 0.2s ease all;
  $index: 0px;
  $index-has-icon: 30px;

  .creative-container {
    padding: 30px;
    background-color: #fff;
    margin-bottom: 100px;

    .form-container {

      input::-webkit-input-placeholder { /* WebKit browsers */
        color: $color-grey-light;
      }
      input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: $color-grey-light;
      }
      input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: $color-grey-light;
      }
      input:-ms-input-placeholder { /* Internet Explorer 10+ */
        color: $color-grey-light;
      }
      .hideTitle {
        position: absolute;
        bottom: 0;
        left: 5px;
        font-size: $font-size-base;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s linear;
      }
      .focusTitle {
        top: -25px;
        opacity: 1;
        visibility: visible;
        color: $color-blue;
        font-size: $font-size-base;
        transition: all 0.3s linear;
      }
      .title-input {
        font-size: $font-size-base;
        padding: $spacer $spacer $spacer - $apixel * 10 $spacer / 2;
        width: 100%;
        border: none;
        line-height: 1;
        border-radius: 0;
        border-bottom: 1px solid #ccc;
        &:focus {
          border: none;
          outline: none;
          border-bottom: 1px solid #409EFF;
        }

      }
      .article-summary {
        textarea {
          padding-right: 40px;
          resize: none;
          border: none;
          border-radius: 0px;
          border-bottom: 1px solid #bfcbd9;
        }
      }
      .word-counter {
        position: absolute;
        left: 10px;
        top: 100%;
        color: $color-grey-light;
      }
      .row2 {
        margin-top: 50px;
      }
      .face-image {
        font-size: 14px;
        color: #606266;
      }
      .article-type {
        margin: 30px 0 30px 0;
      }
      .btn-box {
        margin: 60px 0 30px 50%;
        transform: translateX(-50%);
        text-align: center;
        .btn {
          margin-right: 10px;
        }
      }

    }

  }

</style>
