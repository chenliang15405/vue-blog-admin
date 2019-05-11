<template>
  <el-card class="todolist">
    <header class="header">
      <span @click="toggleAll({ done: !allChecked })">
        <i class="el-icon-edit" />
      </span>
      <input v-model="todoContent" type="text" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo">
    </header>
    <section v-show="todoList.length" class="list-view">
      <template>
        <ul class="todo-list">
          <todo
            v-for="(todo, index) in filterCatagories"
            :key="index"
            :todo="todo"
            @toggleTodo="toggleTodo"
            @editTodo="editTodo"
            @deleteTodo="deleteTodo"
          />
        </ul>
      </template>
    </section>
    <footer v-show="todoList.length" class="footer">
      <span class="item">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item')}}  left
      </span>
      <ul class="filters">
        <li v-for="(value,key) in catagories" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key" >{{ key }}</a>
        </li>
      </ul>
    </footer>
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
const catagories = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
export default {
  name: 'TodoList',
  components: {
    Todo
  },
  filters: {
    // vue自带的过滤器，capitalize： 首字母大写   pluralize ：如果只有一个参数，复数形式只是简单地在末尾添加一个 “s”，如果有多个参数，参数被当作一个字符串数组
    pluralize: (n, w) => n === 1 ? w : w + 's'

  },
  computed: {
    remaining() {
      // done为false的数量
      return this.todoList.filter(todo => !todo.done).length
    },
    filterCatagories() {
      // 处理分类的显示
      return this.catagories[this.visibility](this.todoList)
    }
  },
  data() {
    return {
      todoContent: '',
      todoList: defalutList,
      checked: false,
      allChecked: true,
      catagories: catagories,
      visibility: 'all'
    }
  },
  methods: {
    setTodoListData() {
      // TODO 每次对todoList做修改之后，需要存储到数据库中

    },
    addTodo(e) {
      this.todoList.push({ text: this.todoContent, done: false })
      this.todoContent = ''
      this.setTodoListData()
    },
    toggleAll({ done }) {
      this.allChecked = done
      this.todoList.forEach(todo => {
        todo.done = done
      })
      this.setTodoListData()
    },
    editTodo({ todo, value }) {
      todo.text = value
      this.setTodoListData()
    },
    toggleTodo(todo) {
      todo.done = !todo.done
      this.setTodoListData()
    },
    deleteTodo(todo) {
      var textArr = this.todoList.map(item => {
        return item.text
      })
      this.todoList.splice(textArr.indexOf(todo.text), 1)
      this.setTodoListData()
    }
  }
}
</script>

<style lang="scss">
  @import "./index.scss";

</style>
