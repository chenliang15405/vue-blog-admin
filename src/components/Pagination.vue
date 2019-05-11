<template>
  <div class="pagination" :class="{'hidden':hidden}">
    <!--sync修饰符，可以通过自组件去修改父组件，刷新父组件内容-->
    <el-pagination
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :background="background"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { currentPage: this.currentPage, pageSize: val })
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { currentPage: val, pageSize: this.pageSize })
    }
  }
}
</script>

<style scoped>
  .pagination {
    background: #fff;
    padding: 32px 16px;
  }
  .pagination.hidden {
    display: none;
  }
</style>
