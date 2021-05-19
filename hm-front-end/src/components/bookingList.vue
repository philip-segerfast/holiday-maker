<template>
  
  <div v-if="isLoggedIn">
  <h2>List of bookings</h2>
  <h4>{{ loggedInUser.email }}, you have {{ userBookings.length }} booking(s)</h4>
    <div v-if="userBookings.length > 0">
      <BookingCard v-for="(booking, i) in userBookings" :key="booking + i" :booking="booking" />
    </div>
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
    },
    userBookings() {
      return this.$store.state.userBookings
    },
  },
}
</script>

<style>

</style>
