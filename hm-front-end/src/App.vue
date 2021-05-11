<template>
  <div id="nav">
    <Navbar />
  </div>
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  components: {
    Navbar,
  },
  mounted() {
    this.$store.dispatch("fetchAllHotels");
  },
};
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
