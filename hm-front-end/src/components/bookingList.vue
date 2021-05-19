<template>
  
  <div>
  <h2 v-if="isLoggedIn">List of bookings</h2>
  <h4 v-if="isLoggedIn">{{ loggedInUser.email }}, you have {{ userBookings.length }} booking(s)</h4>
    <div v-if="userBookings.length > 0">
      <BookingCard v-for="(booking, i) in userBookings" :key="booking + i" :booking="booking" />
    </div>
  </div>
  <div v-if ="!isLoggedIn">
    <h2>
    <router-link to="/Login">Login</router-link>
       to se booked hotels
    </h2>
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
    //Sometimes looggedInUser in state is empty instead of null.
   isLoggedIn2() {
      let loggedInBool;
      if (this.loggedInUser == null || "") {
        loggedInBool = false; 
      }
      return loggedInBool
    },
    userBookings() {
      return this.$store.state.userBookings
    },
  },
}
</script>

<style>

</style>
