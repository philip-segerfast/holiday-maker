<template>
  <div id="inner-app-container">
    <div id="toppage">
      <div id="top">
        <div id="logo">
          <h1>Holiday Maker</h1>
        </div>
        <div id="nav">
          <Navbar />
        </div>
      </div>
      <div id="appSearchBar">
        <SearchBar v-if="!['Login', 'Register'].includes($route.name)" />
      </div>
    </div>
    <div id="bottom">
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
  background-color: #ccece7;
  display: flex;
  padding: 2vh 0;
  margin: 0;
  padding: 0;
  height: fit-content;

  #inner-app-container {
    width: 1400px;
    min-height: 100%;
    background-color: #45c3d1;
    margin: 0 auto;
    border-radius: 2vw 2vw 0 0;
    display: flex;
    flex-direction: column;

    #toppage {
      background-image: url("../mockup/assets/77e8e1d2154e4616199c6dc667cd0def.jpg");
      height: fit-content;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      border-radius: inherit;
      #top {
        display: flex;
        #logo {
          display: inline-block;
          margin-left: 50px;
          display: flex;
          position: left;
          width: fit-content;
          margin-right: auto;
          margin-bottom: 0;
        }
        #nav {
          width: fit-content;
          display: flex;
          margin: auto 20px;
        }
      }
    }

    #bottom {
      height: fit-content;
    }
  }
}
.top-page {
  background-color: #2d9ca8be;
}
</style>
