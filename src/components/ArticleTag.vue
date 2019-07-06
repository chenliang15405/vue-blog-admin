<template>
  <div class="article-tag-container">
    <div class="box">
      <span class="title">文章标签：</span>

      <div v-for="(item, i) in list" :key="i" class="tag-list-box">
        <span class="tag-item" :style="item.color">{{ item.name }}</span>
        <i class="el-icon-close" @click="removeTag(item,'done')" />
      </div>

      <div v-show="isShow" class="input-tag">
        <input v-model="value" type="text" class="in" :size="tagLength" @blur="saveTag" @keyup.enter="saveTag" @click="editTag">
        <i class="el-icon-close" @click="removeTag" />
      </div>

      <div class="tag-list" @click="addTag">
        <i class="el-icon-circle-plus" />&nbsp;添加标签
      </div>

    </div>
    <span class="tips">最多添加5个标签</span>
  </div>
</template>

<script>
import { rgbaColor } from '../utils/color'

export default {
  name: 'ArticleTag',
  props: {
    tagslist: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShow: false,
      value: '',
      list: this.tagsList || []
    }
  },
  computed: {
    tagLength() {
      if (this.value.length === 0) {
        return 1
      }
      return this.value.length + 3
    }
  },
  watch: {
    list() {
      if (this.list.length >= 5) {
        this.isShow = false
      }
    }
  },
  methods: {
    addTag() {
      if (this.list.length < 5) {
        this.isShow = true
        if (this.value) {
          const tag = {
            name: this.value,
            color: { 'background-color': rgbaColor(0.8) }
          }
          this.list.push(tag)
          this.$emit('addTag', tag)
          this.value = ''
        }
      }
    },
    removeTag(item, done) {
      if (done) {
        this.list = this.list.filter(val => {
          return val.name !== item.name
        })
        this.$emit('removeTag', this.list)
        return
      }
      this.value = ''
    },
    saveTag(e) {
      if (this.value) {
        const tag = {
          name: this.value,
          color: { 'background-color': rgbaColor(0.8) }
        }

        this.$emit('addTag', tag)
        this.list.push(tag)
        this.value = ''
      }
    },
    editTag() {
      // console.log('edit')
    }
  }
}
</script>

<style scoped lang="scss">
  $color-grey-light: #acacac;

  .article-tag-container {
    margin-top: 30px;
    .box {
      display: flex;
      align-items: center;
    }
    .tag-list-box {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
    .tag-item {
      font-size: 13px;
      background-color: $color-grey-light;
      padding: 2px 6px;
      margin-right: 2px;
      border-radius: 3px;
    }

    .tag-list {
      font-size: 14px;
      color: #409EFF;
    }
    .tips {
      display: block;
      margin: 10px 0 0 80px;
      font-size: 12px;
      color: $color-grey-light;
    }
    .input-tag {
      display: flex;
      align-items: center;
      margin-right: 5px;
    }
    .input-tag .in {
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
  }

</style>
