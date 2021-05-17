<template>
  <div class="result-page">
    <div>
      <SearchBar />
    </div>
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
// Import SearchBar -''-
import HotelCard from "../components/HotelCard.vue";
import SearchBar from "../components/SearchBar.vue";

export default {
  // declare SearchBar from import
  components: {
  // declare HotelCard from import  
    HotelCard,
  // declare SearchBar from import  
    SearchBar,
  },

  computed: {
    // Hämtar hotellistan från store
    hotels() {
      return this.$store.state.hotels;
    },
    // Hämtar filteredHotels från store
    filteredHotels() {
      return this.$store.state.filteredHotels
    },
    sortBy() {
      return this.$$store.state.sortBy
    }
  },

  // Aktiverar kopplingen till backend
  mounted() {
      return this.$store.dispatch("fetchAllHotels");


   

  },
};
</script>

<style></style>
