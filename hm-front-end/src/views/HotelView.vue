<template>
  <body>
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
  </body>

</template>

<script>
import HotelRoomCard from "../components/HotelRoomCard.vue"; 


export default {
  
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

<style scoped lang="scss">
  body {
    background-color: #45C3D1;
  }


  .image-list {
    display: flex;
    flex-direction: row;
    flex-basis: 80%;
    justify-content: center;
    align-items: center;
    margin-left: 0%;
   }
    img {
      display: center;
      border-radius: 20px;
      width: 200px;
      height: 200px;
    
    }
  .room-list{

  }

</style>
