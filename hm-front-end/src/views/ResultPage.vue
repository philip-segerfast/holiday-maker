<template>
  <div class="result-page">
    <div>
      <SearchBar />
    </div>
    <!-- Insert hotels in hotelsList (Nestlar componenten HotelCard i ResultPage)-->
    <!-- Loopar ut (v-for) listan av hotel enskilt = Skapar varje "hotel" som en egen komponent-->
    <div v-if="hotels.length > 0">
      <HotelCard v-for="(hotel, i) in hotels" :key="hotel + i" :hotel="hotel" />
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
      return this.$store.state.searchHotelFilter
    },
  },

  // Aktiverar kopplingen till backend
  mounted() {
    let storeHotels = this.$store.dispatch("fetchAllHotels");
    let filters = this.$store.getters.getSearchHotelFilter;
    console.log(filters)

    let copy = [];

    for(let hotel in storeHotels) {
       copy.push(hotel);
    }

     console.log("Test:");
     console.log(copy);

  },
};
</script>

<style></style>
