<template>
  <div class="booking-card">
    <h3>{{ userBooking.hotel.name }}</h3>
    <h4>Booked between {{ fromDate }} and {{ toDate }}</h4>
    <h4>Number of rooms booked: {{ userBooking.hotelRooms.length }}</h4>
  </div>
</template>

<script>
export default {
  props: ["userBooking"],
  computed: {
    fromDate() {
      return new Date(this.userBooking.fromTime).toLocaleString();
    },
    toDate() {
      return new Date(this.userBooking.toTime).toLocaleString();
    },
  },
};
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
