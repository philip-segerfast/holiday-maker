<template>
<div class="booking-card">
  <h3>BookingCard</h3>
  <h4>Booking id: {{ booking.id }}</h4>
  <h4>Number of rooms booked: {{ booking.hotelRooms.length }}</h4>
</div>
</template>

<script>
export default {

props: ["booking"],
computed: {
    loggedInUser() {
      return this.$store.state.loggedInUser
    },
    isLoggedIn() {
      return this.loggedInUser != null
    },
  },
}
</script>

<style scoped lang="scss">
.booking-card {
  background-color: lightgray;
  margin-bottom: 20px;
  padding: 10px;
  font-family: "Arial";
  border-radius: 30px;
  border: 5px solid whitesmoke;
}
</style>
