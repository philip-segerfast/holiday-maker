<template>
  <body>
  
    <div class="split right">
    <h2>{{ hotelInfo.name }}</h2>
    <h3>Description: {{ hotelInfo.description }}</h3>
    <Address>Location: {{ hotelInfo.address }}</Address>
    <!--Visar alla taggar som är kopplade till ett hotell  -->
    <span  class="tag-list" v-for="tag in hotelInfo.hotelTags" :key="tag"> 
       <h3>{{ tag.label }}  </h3> 
    </span> 
  </div>

   <!--Visar alla bilder som är kopplade till ett hotell -->
  <div id="v-image" class="split left">
    <span v-for="image in hotelInfo.images" :key="image"> 
       <img v-bind:src="`http://localhost:5000/uploads/${image.fileName}`"> 
    </span>
  </div>
  
  
  <!--Lägger in och visar alla rum som finns i rooms, Hämtade från store fetchHotelRoomsByHotel() -->
  <div id="rooms-container">
  <span  class="room-list" v-if="rooms.length > 0"> 
      <hotel-room-card
        v-for="(room, i) in rooms"
        :key="room + i"
        :hotelRoom="room"
      />
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
    margin: 5%;
    display: inline;
  }

  .tag-list {
    display: inline-block;
    background-color:#2EA4B1;
    border-radius: 30px;
    border: 5px solid #5c8791;
    width: 20%;
   }
   .tag-list span{
    display: inline-block;
    font-size: 16px;
    padding: 5px;
   }

 .split{
  height: 280px;
  width: 50%;
  position:fixed;
  z-index:1;
  top:100px;
  overflow-x: hidden;
  padding-left: 20px;
 
}
.left{
  left:0;
  background-color: #5c8791;
}
.right{
  right:0;
  background-color:#5c8791;
}
img {
      display: center;
      border-radius: 20px;
      width: 200px;
      height: 200px;
      padding: 5px;
    
}

  .room-list{
  left: 0;
  position:absolute;
  top:45%;
  width: 100%;
  background-color: cadetblue;

  }



</style>
