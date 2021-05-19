<template>
  <div class="result-page">
    <!-- Insert hotels in hotelsList (Nestlar componenten HotelCard i ResultPage)-->
    <!-- Loopar ut (v-for) listan av hotel enskilt = Skapar varje "hotel" som en egen komponent-->
    <div v-if="filteredHotels.length > 0">
      <HotelCard v-for="(hotel, i) in filteredHotels" :key="hotel + i" :hotel="hotel" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// Import HotelCard to use in ResultPage
import HotelCard from "../components/HotelCard.vue";

export default {
  components: {
    // declare HotelCard from import
    HotelCard,
  },

  computed: {
    // Hämtar hotellistan från store
    hotels() {
      return this.$store.state.hotels;
    },
    // Hämtar filteredHotels från store
    filteredHotels() {
      return this.$store.state.filteredHotels;
    },
  },
};
</script>

<style></style>
