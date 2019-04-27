<template>
  <el-card class="todolist">
    <header class="header">
      <input v-model="todoContent" type="text" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo">
    </header>
  </el-card>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      todoContent: '',
      todoList: []
    }
  },
  methods: {
    addTodo() {

    }
  }
}
</script>

<style scoped lang="scss">
  .todolist {
    background: #fff;
    .header {
      background: #fff;
      width: 100%;
      height: 35px;
      input {
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
        font-size: 18px;
        line-height: 1.4em;
        box-sizing: border-box;
        font-weight: 100;
        outline:none;
        padding: 0 0 10px 30px;
      }
    }
  }

</style>
