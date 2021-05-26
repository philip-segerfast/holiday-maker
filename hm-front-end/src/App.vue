<template>
  <div id="background">
    <div id="toppage">
      <div id="logo">
        <h1>Holiday Maker</h1>
      </div>
      <div id="nav">
        <Navbar />
      </div>
      <div id="appSearchBar">
        <SearchBar v-if="!['Login', 'Register'].includes($route.name)" />
      </div>
      <router-view />
    </div>
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
    this.$store.dispatch("fetchUserBookings");
  },
};
</script>
<style lang="scss" src="./style.scss"></style>
<style lang="scss">
#background {
  background-color: lightgreen;
}
#toppage {
  background-image: url("../mockup/assets/77e8e1d2154e4616199c6dc667cd0def.jpg");
  height: 450px;
}
#app {
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
  #logo {
    margin-left: 50px;
    display: flex;
    position: left;
  }

  /*
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
  */
}
.top-page {
  background-color: #2d9ca8be;
}
</style>
