<template>
  <h3>Booking nr 1</h3>
  <h4>{{ loggedInUser.email }}</h4>
  <h4>{{ loggedInUser.bookings }}</h4>

</template>

<script>
export default {
computed: {
    loggedInUser() {
      return this.$store.state.loggedInUser
    },
    isLoggedIn() {
      return this.loggedInUser != null
    }
  },
}
</script>

<style>

</style>
