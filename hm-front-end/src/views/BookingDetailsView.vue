<template>
  <div>
    <h3>BookingDetailsView</h3>
    <h3>Booking id: {{ booking }}</h3>
    <h4>Rooms: {{ bookedRooms }}</h4>
    <h4>Hotel: {{ hotel }}</h4>
    <h4>User: {{ user }}</h4>
    <!--Visar alla bilder som är kopplade till ett hotell -->
    <!--
    <h2>{{ booking.hotel.name }}</h2>
    <div id="v-image" class="split left">
      <span v-for="image in booking.hotel.images" :key="image">
        <img v-bind:src="`http://localhost:5000/uploads/${image.fileName}`" />
      </span>
    </div>
    <h3>Description: {{ booking.hotel.description }}</h3>
    -->
    <!-- 
      <div id="rooms-container">
      <span class="room-list" v-if="bookedRooms.length > 0">
        <booked-room-card
          v-for="(bookedRoom, i) in bookedRooms"
          :key="bookedRoom + i"
          :bookedRoom="bookedRoom"
        />
      </span>
    </div>
    -->
  </div>
</template>

<script>
//import BookedRoomCard from "../components/BookedRoomCard.vue";
export default {
  //components: { BookedRoomCard },
  data() {
    return {
      id: "",
    };
  },
  computed: {
    booking() {
      return this.$store.state.bookingById;
    },
    bookedHotel() {
      return this.$store.state.bookingById.hotel;
    },
    bookedRooms() {
      return this.$store.state.bookingById.hotelRooms;
    },
    user() {
      return this.$store.state.bookingById.user;
    },
    // Changes epoch time format to normal date format
    bookedFromDate() {
      return new Date(this.booking.fromTime).toLocaleString();
    },
    bookedToDate() {
      return new Date(this.booking.toTime).toLocaleString();
    },
  },
  mounted() {
    console.log("BookingDetailsView mounted");
    this.id = this.$route.params.id;
    console.log("Id of this booking: " + this.id);
    this.$store.commit("setBookingId", this.id);
    this.$store.dispatch("fetchBookingById");
  },
};
</script>

<style>
img {
  display: center;
  border-radius: 20px;
  width: 200px;
  height: 200px;
  padding: 5px;
}
</style>
