<template>
<h1>Hotel</h1>



  <div class="room-list">
        
    <div v-if="rooms.length > 0">
      <hotel-room-card 
        v-for="(room, i) in rooms"
        :key="room + i"
        :hotelRoom="room"
      /> 
    </div>
   </div>
</template>

<script>
import HotelRoomCard from "../components/HotelRoomCard.vue";

export default {
 
  components: {
    HotelRoomCard,
  },

  computed: {
    rooms() {
            
            return this.$store.getters.getHotelRooms
        },
    
  },
  mounted() {
        this.$store.dispatch("fetchHotelRoomsByHotel");
    }
};
</script>

<style>


</style>