<template>
  <div class="result-page">
    <div id="sort-bar">
      <h3>
        Sort by :
        <button @click="sortHotelsByRatings">Ratings</button>
        - Sort by :
        <button @click="sortHotelsByMinPrice">Min Price</button>
        - Sort by :
        <button @click="sortHotelsByMaxPrice">Max Price</button>
      </h3>
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
import HotelCard from "../components/HotelCard.vue";

export default {
  components: {
    // declare HotelCard from import
    HotelCard,
  },

  methods: {
    sortHotelsByMinPrice() {
      this.$store.commit("setSortedHotelsAscending");
      this.$router.push({ path: "/result-page" });
    },
    sortHotelsByMaxPrice() {
      this.$store.commit("setSortedHotelsDescending");
      this.$router.push({ path: "/result-page" });
    },
    sortHotelsByRatings() {
      console.log("sorting ratings: ");
      this.$store.commit("setSortedRatings");
      this.$router.push({ path: "/result-page" });
    },
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
    hotelsByRatings() {
      return this.$store.getters.getSortedRatings;
    },
  },
};
</script>

<style></style>
