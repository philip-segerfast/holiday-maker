<template>
  <h1>Hotel</h1>
 
  <div class="hotel-information">
    <h2>{{ hotelInfo.name }}</h2>
    <h3>Description: {{ hotelInfo.description }}</h3>
    <Address>Location: {{ hotelInfo.address }}</Address>
  </div>

  <li class="hotel-images" >
    <img src="@/assets/images/hotell1.png" alt="" />
    <img src="@/assets/images/hotell2.png" alt="" />
  </li>
  <li  class="room-list" v-if="rooms.length > 0"> 
      <hotel-room-card
        v-for="(room, i) in rooms"
        :key="room + i"
        :hotelRoom="room"
      />
  </li>
  
  



</template>

<script>
import HotelRoomCard from "../components/HotelRoomCard.vue";
//import HotelImage from "../components/HotelImage.vue"; 

export default {
  props: ["hotelById"],

  components: {
   HotelRoomCard, 
   //HotelImage, 
  },

  computed: {
    rooms() {
      return this.$store.getters.getHotelRooms;
    },

    hotelInfo() {
      return this.$store.getters.getHotelById;
    },
  },
  mounted() {
    this.$store.dispatch("fetchHotelRoomsByHotel");
    this.$store.dispatch("fetchHotelById");
  },
};
</script>

<style>
#hotelImage {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}</style>
