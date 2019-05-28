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
            <el-input v-model="postForm.summary" :rows="1" type="textarea" class="article-summary" autosize placeholder="请输入文章摘要" />
            <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}/100 字</span>
          </el-form-item>

          <el-row class="row2">
            <el-col :span="6">
              <el-form-item style="margin-bottom: 40px;" label="作者" prop="author">
                <el-select v-model="postForm.author" :remote-method="getRemoteUserList" :loading="loading" clearable filterable default-first-option remote placeholder="搜索用户">
                  <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item style="margin: 0 0 40px 20px;" label="发布时间" prop="createdate">
                <el-date-picker v-model="postForm.createdate" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <span class="face-image">封面图：</span>
              <img-upload />
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item prop="content">
                <rich-text-editor :content="postForm.content" @changeContent="changeContent" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <article-tag
                :tagslist="postForm.tagsList"
                @addTag="addTag"
                @removeTag="removeTag"
              />
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <article-category
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
                <el-select v-model="postForm.orginal_status" placeholder="请选择">
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
                v-model="postForm.privacy"
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
                <el-button type="info" plain @click="goBack">返回</el-button>
              </div>
            </el-col>
          </el-row>

        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import ImgUpload from '@/components/ImgUpload'
import RichTextEditor from '@/components/editor/RichTextEditor'
import ArticleTag from '@/components/ArticleTag'
import ArticleCategory from '@/components/ArticleCategory'
import { getAllUser } from '@/api/user'
import { createArticle, createArticleDraft } from '@/api/article'

const ARTICLE_TYPE = ['0', '1', '2']

// TODO  可以写一个Toast用于npm
export default {
  name: 'TxtEditor',
  components: {
    ImgUpload,
    RichTextEditor,
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
        content: '',
        tagsList: [],
        cateList: [],
        privacy: false
      },
      userListOptions: [],
      contentShortLength: 0,
      loading: false,
      articleType: ARTICLE_TYPE,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请选择作者', trigger: 'blur' }
        ],
        createdate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    'postForm.summary'(old, newVal) {
      this.contentShortLength = newVal.length
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
    changeContent(html) {
      this.postForm.content = html
    },
    addTag(val) {
      this.postForm.tagsList.push(val)
    },
    removeTag(array) {
      this.postForm.tagsList = array
    },
    handleCateChecked(checkedList) {
      this.postForm.cateList = checkedList
    },
    createCate(val) {
      this.postForm.cateList.push(val)
    },
    removeCate(array) {
      this.postForm.cateList = array
    },
    submitForm() {
      // 发布博客
      this.$refs['postForm'].validate((valid) => {
        if (valid) {
          const flag = this.validateProps()
          if (flag) {
            // 提交数据
            try {
              const resp = createArticle(this.postForm)
              console.log(resp)
              // TODO 提示成功
            } catch (e) {
              console.log(e)
              this.$message.error(`提交数据失败，系统异常`)
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    saveDraft() {
      // 直接保存为草稿
      try {
        const resp = createArticleDraft(this.postForm)
        console.log(resp)
      //  TODO 提示保存成功
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
        this.$message.error('请填写博客内容')
      } else if (!this.postForm.cateList) {
        flag = false
        this.$message.error('请选择博客分类')
      } else if (!this.postForm.tagsList) {
        flag = false
        this.$message.error('请设置博客标签')
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
        text-align: center;
        transform: translateX(-50%);
        .btn {
          margin-right: 10px;
        }
      }

    }

  }

</style>
