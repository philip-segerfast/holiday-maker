<template>
  <div class="booking-card">
    <h3>{{ userBooking.hotel.name }}</h3>

    <!-- Shows first image in list of images in hotel object -->
    <img v-bind:src="`http://localhost:5000/uploads/${userBooking.hotel.images[0].fileName}`" />

    <h4>Booked between {{ bookedFromDate }} and {{ bookedToDate }}</h4>
    <h4>{{ userBooking.hotelRooms.length }} room(s) booked.</h4>
    <div id="v-image" class="split left"></div>
  </div>
</template>

<script>
export default {
  props: ["userBooking"],
  computed: {
    
    // Changes epoch time format to normal date format
    bookedFromDate() {
      return new Date(this.userBooking.fromTime).toLocaleString();
    },
    bookedToDate() {
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
img {
  display: center;
  border-radius: 20px;
  width: 200px;
  height: 200px;
  padding: 5px;
}
</style>
