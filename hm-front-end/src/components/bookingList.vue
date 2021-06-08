<template>
  <div>
    <div v-if="isLoggedIn">
      <h2>List of bookings</h2>
      <h4>{{ loggedInUser.first_name }}, you have {{ userBookingList.length }} booking(s)</h4>
      <div v-if="userBookingList.length > 0">
        <BookingCard
          v-for="(userBooking, i) in userBookingList"
          :key="userBooking + i"
          :userBooking="userBooking"
        />
      </div>
    </div>
    <div v-if="!isLoggedIn">
      <h2>
        <router-link to="/Login">Login</router-link>
        to se booked hotels
      </h2>
    </div>
  </div>
</template>

<script>
import BookingCard from "./BookingCard";
export default {
  components: { BookingCard },

  computed: {
    loggedInUser() {
      return this.$store.state.loggedInUser;
    },
    isLoggedIn() {
      return this.loggedInUser != null;
    },
    userBookingList() {
      return this.$store.state.userBookingList;
    },
  },
};
</script>

<style></style>
