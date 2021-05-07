<template>
  <h1>Hotel</h1>

  <div class="hotel-information">
    <h2>{{ hotelInfo.name }}</h2>
    <h3>Description: {{ hotelInfo.description }}</h3>
    <Address>Location: {{ hotelInfo.address }}</Address>
  </div>

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

<style></style>
