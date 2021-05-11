<template>
  <h1>Hotel</h1>
 
  <div class="hotel-information">
    <h2>{{ hotelInfo.name }}</h2>
    <h3>Description: {{ hotelInfo.description }}</h3>
    <Address>Location: {{ hotelInfo.address }}</Address>    
  </div>

  <!--Visar alla bilder som är kopplade till ett hotell -->
  <div id="v-image" class="image-list">
    <li v-for="image in hotelInfo.images" :key="image"> 
       <img v-bind:src="`http://localhost:5000/uploads/${image.fileName}`"> 
    </li>
  </div>

  <!--Lägger in och visar alla rum som finns i rooms, Hämtade från store fetchHotelRoomsByHotel() -->
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
  .image-list {
    align-content: center;
    position: relative;
   
  }
    img {
      
      width: 300px;
      height: auto;
    
    }

</style>
