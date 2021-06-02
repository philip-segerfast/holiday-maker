<template>
  <div>
    <h4>Booking id: {{ userBooking.id }}</h4>
    <div>
      <h4>
        Number of adults: {{ userBooking.adults }}. <br />
        Number of children: {{ userBooking.children.length }}.
        <br />
        Arrival: {{ bookedFromDate }}.<br />
        Checkout: {{ bookedToDate }}.
      </h4>
    </div>
    <h4>Hotel: {{ bookedHotel.name }}</h4>

    <!--Visar alla bilder som är kopplade till ett hotell -->
    <div id="v-image" class="split left">
      <span v-for="image in bookedHotel.images" :key="image">
        <img v-bind:src="`http://localhost:5000/uploads/${image.fileName}`" />
      </span>
    </div>
    <h4>{{ bookedHotel.description }}</h4>
    <h4>Address: {{ bookedHotel.address }}, {{ bookedHotel.city }}</h4>
    <h4>Extra beds: {{ userBooking.extraBeds }}</h4>
    <h4>Service level: {{ this.LuxuryClass }}</h4>

    <h3>Booked rooms:</h3>
    <div id="rooms-container">
      <span class="room-list" v-if="bookedRooms.length > 0">
        <BookedRoomCard
          v-for="(bookedRoom, index) in bookedRooms"
          :key="bookedRoom.id + index"
          :bookedRoom="bookedRoom"
          :roomArrayIndex="index"
        />
      </span>
    </div>
    <div>
      <form @submit.prevent="updateBooking">
        <button type="submit">Update booking</button>
      </form>
    </div>
  </div>
</template>

<script>
import BookedRoomCard from "../components/BookedRoomCard.vue";
export default {
  components: { BookedRoomCard },
  data() {
    return {
      id: "",
    };
  },
  computed: {
    userBooking() {
      return this.$store.state.userBooking;
    },
    bookedHotel() {
      return this.$store.state.userBooking.hotel;
    },
    bookedRooms() {
      return this.$store.state.userBooking.hotelRooms;
    },
    user() {
      return this.$store.state.userBooking.user;
    },
    // Changes epoch time format to normal date format
    bookedFromDate() {
      return new Date(this.userBooking.fromTime * 1000).toLocaleString();
    },
    bookedToDate() {
      return new Date(this.userBooking.toTime * 1000).toLocaleString();
    },
    LuxuryClass() {
      if (this.userBooking.luxuryClass == 1) {
        return "Self catering";
      } else if (this.userBooking.luxuryClass == 2) {
        return "Half pension";
      } else if (this.userBooking.luxuryClass == 3) {
        return "Full board";
      } else if (this.userBooking.luxuryClass == 4) {
        return "All inclusive";
      }
      return "Something went wrong. LuxuryClass: " + this.userBooking.luxuryClass;
    },
  },
  methods: {
    updateBooking() {
      this.$store.dispatch("fetchUpdateBooking");
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.$store.dispatch("fetchUserBooking", this.id);
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
.room-list {
  left: 0;
  top: 38%;
  width: 100%;
  background-color: cadetblue;
}
</style>
