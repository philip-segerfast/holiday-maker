<template>
  <div class="home">
    <h1 v-if ="!isLoggedIn">Welcome!</h1>
    <h1 v-if="isLoggedIn">Welcome {{ loggedInUser.email }}!</h1>
  </div>
</template>

<script>
//import SearchBar from "../components/SearchBar.vue";

export default {
  name: "Home",
  //components: { SearchBar },
  computed: {
    loggedInUser() {
      return this.$store.state.loggedInUser
    },
    isLoggedIn() {
      return this.loggedInUser != null
    }
  },
  methods: {
    search() {
      console.log();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
