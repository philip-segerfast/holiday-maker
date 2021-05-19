<template>
  <h3>Booking nr 1</h3>
  <h4>{{ loggedInUser.email }}</h4>
  <h4>{{ userBookings }}</h4>

</template>

<script>
export default {
computed: {
    loggedInUser() {
      return this.$store.state.loggedInUser
    },
    isLoggedIn() {
      return this.loggedInUser != null
    },
    userBookings() {
      return this.$store.state.userBookings
    },
  },
}
</script>

<style>

</style>
