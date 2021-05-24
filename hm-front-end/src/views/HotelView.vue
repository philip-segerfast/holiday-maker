<template>
  <body>
    <div id="sort-bar">
      <h3>
        Sort by :
        <button @click="sortHotelRoomsByPrice">Sort Rooms</button>
      </h3>
    </div>
    <div class="split right">
      <h1>{{ hotelInfo.name }}</h1>
      <!--Visar alla bilder som är kopplade till ett hotell -->
      <span v-for="image in hotelInfo.images" :key="image">
        <img v-bind:src="`http://localhost:5000/uploads/${image.fileName}`" />
      </span>
      <h2>check-in date: {{ startDate }} - check-out date: {{ endDate }}</h2>
      <h2>Number of adult: {{ amountAdult }}</h2>
      <h4>{{ hotelInfo.description }}</h4>
      <h4>Cost Extrabed: {{ hotelInfo.extraBedPrice }} | Location: {{ hotelInfo.address }}</h4>
      <!--Visar alla taggar som är kopplade till ett hotell  -->
      <span class="tag-list" v-for="tag in hotelInfo.hotelTags" :key="tag">
        <h4>{{ tag.label }}</h4>
      </span>
      <h3>
        Add rooms and press book
        <button class="booking" @click="redirectToBookingView">Book</button>
      </h3>
    </div>

    <!--Lägger in och visar alla rum som finns i rooms, Hämtade från store fetchHotelRoomsByHotel() -->
    <div id="rooms-container">
      <span class="room-list" v-if="rooms.length > 0">
        <hotel-room-card v-for="(room, i) in rooms" :key="room + i" :hotelRoom="room" />
      </span>
    </div>
  </body>
</template>

<script>
import HotelRoomCard from "../components/HotelRoomCard.vue";
import moment from "moment";

export default {
  components: {
    HotelRoomCard,
  },
  methods: {
    redirectToBookingView() {
      this.$store.commit("setHotelToBook", this.hotelInfo);
      const routerUrl = "/bookingView";
      this.$router.push({ path: routerUrl });
    },
    sortHotelRoomsByPrice() {
      console.log("sorting: ");
      this.$router.push({ path: "/hotelView" });
      this.$store.commit("setSortedRooms");
    },
  },

  computed: {
    rooms() {
      return this.$store.getters.getHotelRooms;
    },

    hotelInfo() {
      return this.$store.getters.getHotelById;
    },
    roomsByPrice() {
      return this.$store.getters.sortedRooms;
    },
    startDate() {
      var date = new Date(this.$store.getters.getStartDate * 1000);
      return moment(date).format("YYYY-MM-DD");
    },
    endDate() {
      var date = new Date(this.$store.getters.getEndDate * 1000);
      return moment(date).format("YYYY-MM-DD");
    },
    amountAdult() {
      return this.$store.getters.getAdultAmount;
    },
  },
  mounted() {
    this.$store.dispatch("fetchHotelRoomsByHotel");
    this.$store.dispatch("fetchHotelById");
  },
};
</script>

<style scoped lang="scss">
.split {
  width: 100%;
  overflow-x: hidden;
  padding-left: 20px;
}
.left {
  left: 0;
  background-color: #5c8791;
}
.right {
  right: 0;
  background-color: #5c8791;
}
.tag-list {
  display: inline-block;
  background-color: #2ea4b1;
  border-radius: 15px;
  border: 2px solid #5c8791;
  width: 150px;
}
.tag-list span {
  display: inline-block;
  font-size: 8px;
  padding: 2px;
}
img {
  display: center;
  border-radius: 20px;
  width: 200px;
  height: 200px;
  padding: 5px;
}

.room-list {
  width: 100%;
  background-color: cadetblue;
}
.booking {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  text-align: center;
  font-family: "Arial";
  display: inline-block;
  font-size: 30px;
  margin: 4px 2px;
  width: 200px;
  border-radius: 15px;
  cursor: pointer;
}
</style>
