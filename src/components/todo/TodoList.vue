<template>
  <el-card class="todolist" :body-style="padding">
    <header class="header">
      <i class="el-icon-edit" />
      <input v-model="todoContent" type="text" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo">
    </header>
    <section v-show="todoList.length" class="list-view">
      <template>
        <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">
        <label for="toggle-all" />
        <ul class="todo-list">
          <todo
            v-for="(todo, index) in todoList"
            :key="index"
            :todo="todo"
            @toggleTodo="toggleTodo"
            @editTodo="editTodo"
            @deleteTodo="deleteTodo"
          />
        </ul>
      </template>
    </section>
  </el-card>
</template>

<script>
import Todo from './Todo'

const defalutList = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]
export default {
  name: 'TodoList',
  components: {
    Todo
  },
  data() {
    return {
      todoContent: '',
      todoList: defalutList,
      padding: { padding: '15px' },
      checked: false
    }
  },
  methods: {
    setTodoListData() {
      // TODO 每次对todoList做修改之后，需要存储到数据库中

    },
    addTodo(e) {
      console.log(e)
      // 可以直接使用v-model
    },
    toggleAll({ done }) {

    },
    editTodo() {

    },
    toggleTodo(todo) {
      todo.done = !todo.done
      this.setTodoListData()
    },
    deleteTodo(todo) {
      this.todoList.splice(this.todoList.indexOf(todo), 1)
      this.setTodoListData()
    }
  }
}
</script>

<style scoped lang="scss">
  .todolist {
    background: #fff;
    box-sizing: border-box;
    .header {
      background: #fff;
      width: 100%;
      height: 35px;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        padding-bottom: 10px;
      }
      input {
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
        font-size: 18px;
        line-height: 1.4em;
        box-sizing: border-box;
        font-weight: 100;
        outline:none;
        margin-left: 10px;
        padding-bottom: 10px;
        width: 100%;
      }
    }
    .list-view {
      width: 100%;
      background: #fff;
      margin: 10px 10px 10px 10px;
      .el-checkbox {
        margin-right: 10px !important;
      }
      .todo-item {
        overflow: hidden;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding: 5px;
        margin-bottom: 10px;
        .todo-title {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }

</style>
