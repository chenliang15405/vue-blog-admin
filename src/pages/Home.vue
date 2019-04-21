<template>
  <div class="wrapper">
    <v-header></v-header>
    <!--<v-sidebar></v-sidebar>-->
    <div class="content-box" :class="{'content-collapse':collapse}">
      <!--<v-tags></v-tags>-->
      <div class="content">
        <transition name="move" mode="out-in">
          <!--<keep-alive :include="tagsList">-->
          <router-view />
          <!--</keep-alive>-->
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  name: 'Dashboard',
  components: {
    'vHeader': Header
  },
  data() {
    return {
      collapse: false
    }
  }

}
</script>

<style scoped>

</style>
