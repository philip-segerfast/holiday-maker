<template>
  <body>
    <div class="split right">
      <h1>{{ hotelInfo.name }}</h1>
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

    <!--Visar alla bilder som är kopplade till ett hotell -->
    <div id="v-image" class="split left">
      <span v-for="image in hotelInfo.images" :key="image">
        <img v-bind:src="`http://localhost:5000/uploads/${image.fileName}`" />
      </span>
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
  },
  mounted() {
    this.$store.dispatch("fetchHotelRoomsByHotel");
    this.$store.dispatch("fetchHotelById");
  },
};
</script>

<style scoped lang="scss">
body {
  background-color: #45c3d1;
  margin: 5%;
  display: inline;
  line-height: 6px;
}

.tag-list {
  display: inline-block;
  background-color: #2ea4b1;
  border-radius: 20px;
  border: 2px solid #5c8791;
  width: 20%;
}
.tag-list span {
  display: inline-block;
  font-size: 8px;
  padding: 2px;
}

.split {
  height: 250px;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 150px;
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
img {
  display: center;
  border-radius: 20px;
  width: 200px;
  height: 200px;
  padding: 5px;
}

.room-list {
  left: 0;
  position: absolute;
  top: 50%;
  width: 100%;
  background-color: cadetblue;
}
.booking {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
