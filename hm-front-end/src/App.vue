<template>
  <div id="nav">
    <Navbar />
  </div>
  <div id="appSearchBar">
    <SearchBar v-if="!['Login', 'Register'].includes($route.name)" />
    </div>
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar.vue"
export default {
  components:{
    Navbar,
    SearchBar
  },
  mounted() {
    this.$store.dispatch("fetchLoggedInUser");
    this.$store.dispatch("fetchAllHotels");
    this.$store.dispatch("fetchUserBookings");
  },
}
</script>
<style lang="scss" src="./style.scss"></style>
<style scoped lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  height: 100vh;

  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
