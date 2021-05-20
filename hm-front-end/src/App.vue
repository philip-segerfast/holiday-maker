<template>
  <div>
    <div id="nav">
      <Navbar />
    </div>
    <div id="appSearchBar">
      <SearchBar v-if="!['Login', 'Register'].includes($route.name)" />
    </div>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar.vue";
export default {
  components: {
    Navbar,
    SearchBar,
  },
  mounted() {
    this.$store.dispatch("fetchLoggedInUser");
    this.$store.dispatch("fetchAllHotels");
  },
};
</script>
<style lang="scss" src="./style.scss"></style>
<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;

  #nav {
    padding: 30px;
    position: fixed;

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
