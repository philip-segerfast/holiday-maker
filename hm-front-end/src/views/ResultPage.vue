<template>
  <div class="result-page">
    <div>
      <SearchBar />
    </div>
    <!-- Insert hotels in hotelsList (Nestlar componenten HotelCard i ResultPage)-->
    <!-- Loopar ut (v-for) listan av hotel enskilt = Skapar varje "hotel" som en egen komponent-->
    <div v-if="filteredHotels2.length > 0">
      <HotelCard v-for="(hotel, i) in filteredHotels2" :key="hotel + i" :hotel="hotel" />
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
  // declare HotelCard from import
  // declare SearchBar from import
  components: {
    HotelCard,
    SearchBar,
  },

  computed: {
    // Hämtar hotellistan från store
    hotels() {
      return this.$store.state.hotels;
    },
    filteredHotels() {
      return this.$store.state.filteredHotels
    },
    filteredHotels2() {
      return this.$store.computed.filteredHotelsFromStore()
    }
  },

  // Aktiverar kopplingen till backend
  mounted() {
    let storeHotels = this.$store.dispatch("fetchAllHotels");


   

  },
};
</script>

<style></style>
