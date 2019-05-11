<template>
  <li :class="{ completed: todo.done, editing: editing }">
    <div class="view">
      <input type="checkbox" :checked="todo.done" class="toggle" @change="toggleTodo(todo)">
      <label @dblclick="editing = true" v-text="todo.text" />
      <button class="destroy" @click="deleteTodo( todo )" />
    </div>
    <input
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    >
  </li>
</template>

<script>
export default {
  name: 'Todo',
  // directives 相当于生命周期中执行的函数
  directives: {
    //   如果有更新dom，则执行方法，如果没有更新，则不执行
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  props: {
    todo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      editing: false
    }
  },
  methods: {
    toggleTodo(todo) {
      this.$emit('toggleTodo', todo)
    },
    deleteTodo(todo) {
      this.$emit('deleteTodo', todo)
    },
    doneEdit(e) {
      const value = e.target.value.trim()
      const { todo } = this // 从this中解构todo，this表示当前todo组件实例，只有一个传递的todo对象
      // console.log(this)
      if (!value) {
        this.deleteTodo({
          todo
        })
      } else if (this.editing) {
        this.$emit('editTodo', {
          todo,
          value
        })
      }
      this.editing = false
    },
    cancelEdit() {

    }
  }
}
</script>

<style scoped>

</style>
