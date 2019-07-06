<template>
  <div class="article-category-container">
    <div class="box">
      <span class="title">个人分类：</span>

      <div v-for="(item, i) in newCateList" :key="i" class="tag-list-box">
        <span class="tag-item">{{ item }}</span>
        <i class="el-icon-close" @click="removeCate(item,'done')" />
      </div>

      <div v-show="isShow" class="input-cate">
        <input v-model="value" type="text" class="in" :size="inLength" @blur="saveCate" @keyup.enter="saveCate" @click="editCate">
        <i class="el-icon-close" @click="removeCate" />
      </div>

      <div class="cate-add" v-show="addCateShow" @click="addCate">
        <i class="el-icon-circle-plus" />&nbsp;添加新分类
      </div>
    </div>

    <div class="cate-list">
      <div class="list-box">
        <el-checkbox-group
          v-model="checkedList"
          :max="1"
          @change="handleChecked"
        >
          <el-checkbox :disabled="newCateList.length > 0" v-for="item in optionList" :key="item.id" class="option" :label="item.id">{{ item.categoryname }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

  </div>
</template>

<script>
import { getAllCategoryList } from '@/api/category'

export default {
  name: 'ArticleCategory',
  props: {
    categoryList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      optionList: [],
      checkedList: [],
      newCateList: [],
      isShow: false,
      addCateShow: true,
      value: ''
    }
  },
  computed: {
    inLength() {
      if (this.value.length === 0) {
        return 1
      }
      return this.value.length + 3
    }
  },
  watch: {
    newCateList() {
      if (this.newCateList.length >= 3) {
        this.isShow = false
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const data = await getAllCategoryList()
        const list = data.data
        this.optionList = list.map(item => {
          const obj = {
            id: item.id,
            categoryname: item.categoryname
          }
          return obj
        })
      } catch (e) {
        console.log(e)
      }
    },
    addCate() {
      // console.log(this.newCateList.length)
      if (this.newCateList.length > 0 || this.checkedList.length > 0) {
        return
      }
      this.isShow = true
      if (this.value) {
        this.newCateList.push(this.value)
        if (this.newCateList.length >= 1) {
          this.addCateShow = false
          this.isShow = false
        }
        this.$emit('createCate', this.value)
        this.value = ''
      }
    },
    handleChecked(value) {
      if (this.newCateList.length > 0) {
        return
      }
      this.checkedList = value
      this.$emit('handleChecked', this.checkedList)
    },
    removeCate(item, done) {
      if (done) {
        this.newCateList = this.newCateList.filter(val => {
          return val !== item
        })
        this.$emit('removeCate', this.newCateList)
        this.isShow = true && (this.addCateShow = true) // 针对使用一个分类
        return
      }
      this.value = ''
    },
    saveCate() {
      if (this.value) {
        this.$emit('createCate', this.value)
        this.newCateList.push(this.value)
        if (this.newCateList.length >= 1) {
          this.addCateShow = false
          this.isShow = false
        }
        this.value = ''
      }
    },
    editCate() {

    }
  }
}
</script>

<style scoped lang="scss">
  $color-grey-light: #acacac;
  $color-grey-background: #FAFAFA;
  $color-grey-border: #DDDDDD;

  .article-category-container {
    margin-top: 30px;
    .box {
      display: flex;
      align-items: center;
    }
    .cate-add {
      font-size: 14px;
      color: #409EFF;
    }

    .cate-list {
      margin-top: 16px;
      margin-left: 80px;
      padding: 8px 8px 0 16px;
      width: 400px;
      max-height: 200px;

      border: 1px solid $color-grey-border;
      background-color: $color-grey-background;
      overflow-y: auto;
      overflow-x: hidden;

      .option {
        /*float: left;*/
        width: 50%;
        line-height: 30px;
      }
      .el-checkbox {
        margin-right: 0;
      }
    }

    .input-cate {
      display: flex;
      align-items: center;
      margin-right: 5px;
    }
    .input-cate .in {
      outline: none;
      border: 1px solid #324157;
      padding: 2px 3px;
      margin-right: 3px;
      border-radius: 3px;
    }
    .el-icon-close {
      font-weight: bold;
      color: $color-grey-light;
    }
    .el-icon-close:hover {
      font-size: 18px;
      color: red;
    }

    .tag-list-box {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
    .tag-item {
      font-size: 13px;
      background-color: $color-grey-light;
      padding: 2px 10px;
      margin-right: 2px;
      border-radius: 3px;
    }
  }
</style>
