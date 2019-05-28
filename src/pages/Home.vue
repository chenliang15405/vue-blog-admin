<template>
  <div class="wrapper">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags />
      <div class="content">
        <transition name="move" mode="out-in">
          <!--<keep-alive :include="tagsList"> 可以保持浏览记录，在react-blog中也可以使用-->
          <router-view />
        <!--</keep-alive>-->
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Tags from '../components/Tags'

export default {
  name: 'Dashboard',
  components: {
    'vHeader': Header,
    'vSidebar': SideBar,
    'vTags': Tags
  },
  computed: {
    collapse() {
      const collapse = this.$store.getters.collapse
      console.log('vuex collapse ', collapse)
      return collapse
    }
  }
}
</script>

<style scoped>

</style>
