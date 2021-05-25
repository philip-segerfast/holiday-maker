<template>
  <div>
    <h4>Booking id: {{ userBooking.id }}</h4>
    <!--
    <div>
      <h4>
        Number of adults: {{ userBooking.adults }}. Number of children:
        {{ userBooking.children.length }}. <br />
        Booked from: {{ bookedFromDate }} to {{ bookedToDate }}.
      </h4>
    </div>
    <h4>Hotel: {{ bookedHotel.name }}</h4>
    -->

    <!--Visar alla bilder som är kopplade till ett hotell -->
    <!--
    <div id="v-image" class="split left">
      <span v-for="image in bookedHotel.images" :key="image">
        <img v-bind:src="`http://localhost:5000/uploads/${image.fileName}`" />
      </span>
    </div>
    <h4>{{ bookedHotel.description }}</h4>
    <h4>Address: {{ bookedHotel.address }}, {{ bookedHotel.city }}</h4>

    <h3>Booked rooms:</h3>
    <div id="rooms-container">
      <span class="room-list" v-if="bookedRooms.length > 0">
        <BookedRoomCard
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
      emptyBooking: {
        id: 0,
        adults: 0,
        children: 0,
        fromTime: 0,
        toTime: 0,
        hotel: {
          name: 0,
        },
      },
    };
  },
  computed: {
    userBooking() {
      console.log("Booking object: ");
      console.log(this.$store.state.userBooking);
      if (this.userBooking) {
        return this.$store.state.userBooking;
      } else {
        return this.emptyBooking;
      }
    },
    bookedHotel() {
      if (this.userBooking) {
        return this.$store.state.userBooking.hotel;
      } else {
        return null;
      }
      //return this.$store.state.userBooking.hotel;
    },
    bookedRooms() {
      if (this.userBooking) {
        return this.$store.state.userBooking.hotelRooms;
      } else {
        return null;
      }
      //return this.$store.state.userBooking.hotelRooms;
    },
    user() {
      if (this.userBooking) {
        return this.$store.state.userBooking.user;
      } else {
        return null;
      }
      //return this.$store.state.userBooking.user;
    },
    // Changes epoch time format to normal date format
    bookedFromDate() {
      return new Date(this.userBooking.fromTime).toLocaleString();
    },
    bookedToDate() {
      return new Date(this.userBooking.toTime).toLocaleString();
    },
  },
  methods: {
    redirectIfNoBooking() {
      if (!this.$store.state.userBooking) {
        this.$router.push({ path: "/" });
      }
    },
  },
  mounted() {
    // this.id = this.$route.params.id;
    // console.log("Id of this booking: " + this.id);
    // this.$store.commit("setBookingId", this.id);
    // this.$store.dispatch("fetchUserBooking");
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
