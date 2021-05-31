<template>
  <div id="inner-app-container">
    <div id="toppage">
      <div id="top">
        <div id="logo">
          <h1><a id="logolink" href="/">Holiday Maker</a></h1>
        </div>
        <div id="nav">
          <Navbar />
        </div>
      </div>
      <div v-if="shouldShowFilteringStuff">
        <SearchBar />
      </div>
    </div>
    <div id="bottom">
      <div v-show="shouldShowFilteringStuff" id="sidebar">
        <FilterComponent />
      </div>
      <div id="router-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar.vue";
import FilterComponent from "./components/FilterComponent.vue";
export default {
  components: {
    Navbar,
    SearchBar,
    FilterComponent,
  },
  mounted() {
    this.$store.dispatch("fetchLoggedInUser");
    this.$store.dispatch("fetchAllHotels");
  },
  computed: {
    shouldShowFilteringStuff() {
      return !["Login", "Register", "About"].includes(this.$route.name);
    },
  },
};
</script>
<style lang="scss" src="./style.scss"></style>
<style lang="scss">
#logolink {
  color: black;
  text-decoration: none;
}
#background {
  background-color: lightgreen;
}
#toppage {
  background-image: url("../mockup/assets/77e8e1d2154e4616199c6dc667cd0def.jpg");
  height: 450px;
}
#app {
  display: flex;
  flex-direction: column;
  justify-items: stretch;

  text-align: center;
  color: #2c3e50;
  background-color: #ccece7;
  padding: 2vh 0;
  height: fit-content;
  min-height: 100vh;
  #logo {
    margin-left: 50px;
    display: flex;
    position: left;
  }

  #inner-app-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    width: 1300px;
    background-color: #45c3d1;
    margin: 0 auto;
    border-radius: 2vw 2vw 0 0;

    #toppage {
      display: flex;
      flex-direction: column;
      background-image: url("../mockup/assets/77e8e1d2154e4616199c6dc667cd0def.jpg");
      height: fit-content;
      padding-bottom: 20px;
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
      display: flex;
      margin: 20px;

      #sidebar {
        width: fit-content;
      }

      #router-view {
        width: 100%;
      }
    }
  }
}
</style>
