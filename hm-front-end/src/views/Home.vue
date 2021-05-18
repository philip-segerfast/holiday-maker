<template>
  <div class="home">
    <h1 v-if ="!isLoggedIn">Welcome!</h1>
    <h1 v-if="isLoggedIn">Welcome {{ loggedInUser.email }}!</h1>
    <BookingList />
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import BookingList from "../components/BookingList";

export default {
  name: "Home",
  components: { SearchBar, BookingList }, 
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
