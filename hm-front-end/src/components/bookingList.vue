<template>
  
  <div v-if="isLoggedIn">
  <h2>List of bookings</h2>
  <BookingCard />
  </div>
  <div v-if ="!isLoggedIn">
    <h2>Login to se booked hotels</h2>
  </div>
</template>

<script>
import BookingCard from "./BookingCard"
export default {
  components: { BookingCard },

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
