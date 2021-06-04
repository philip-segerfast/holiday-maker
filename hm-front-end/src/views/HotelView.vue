<template>
  <body>
    <div class="hotel-info">
      <h1>{{ hotelInfo.name }}</h1>
      <!--Visar alla bilder som är kopplade till ett hotell -->
      <span v-for="image in hotelInfo.images" :key="image">
        <img v-bind:src="`http://localhost:5000/uploads/${image.fileName}`" />
      </span>
      <h2>Check-in date: {{ startDate }} | Check-out date: {{ endDate }}</h2>
      <h2>{{ amountAdult }} Adult and {{ amountChildren }} Child</h2>
      <h4>{{ hotelInfo.description }}</h4>
      <h4>Cost Extrabed: {{ hotelInfo.extraBedPrice }} | Location: {{ hotelInfo.address }}</h4>
      <!--Visar alla taggar som är kopplade till ett hotell  -->
      <span class="tag-list" v-for="tag in hotelInfo.hotelTags" :key="tag">
        <h4>{{ tag.label }}</h4>
      </span>
      <div id="sort-bar">
        <h4>
          Sort by:
          <button class="btn" @click="sortHotelRoomsByPrice">Min Price</button>
          <button class="btn" @click="sortHotelRoomsByMaxPrice">Max Price</button>
        </h4>
      </div>
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
    sortHotelRoomsByMaxPrice() {
      console.log("sorting: ");
      this.$router.push({ path: "/hotelView" });
      this.$store.commit("setSortedRoomsDescending");
    },
  },

  computed: {
    rooms() {
      return this.$store.getters.getHotelRooms;
    },

    hotelInfo() {
      return this.$store.getters.getHotelById;
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
    amountChildren() {
      return this.$store.getters.getChildrenAmount;
    },
  },
  mounted() {
    this.$store.dispatch("fetchHotelRoomsByHotel");
    this.$store.dispatch("fetchHotelById");
  },
};
</script>

<style scoped lang="scss">
.btn {
  margin-right: 10px;
  background-color: rgba(230, 211, 48);
  border: none;
  height: 50px;
  height: 100%;
  width: 100px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
}
.components {
  margin-right: 10px;
  display: inline-block;
  background-color: #1a88bb;
  border-radius: 12px;
}
.total-info {
  background-color: #3fb0bd;
  border-radius: 10px;
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
  display: inline;
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
