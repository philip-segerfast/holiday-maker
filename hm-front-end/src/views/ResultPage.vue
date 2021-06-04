<template>
  <div id="result-page">
    <!-- <div id="sort-bar">
      <h3>
        Sort by :
        <button @click="sortHotelsByRatings">Ratings</button>
        -
        <button @click="sortHotelsByMinPrice">Min Price</button>
        -
        <button @click="sortHotelsByMaxPrice">Max Price</button>
      </h3>
    </div> -->
    <div class="main-container">
      <!-- Insert hotels in hotelsList (Nestlar componenten HotelCard i ResultPage)-->
      <!-- Loopar ut (v-for) listan av hotel enskilt = Skapar varje "hotel" som en egen komponent-->
      <div class="list-hotel" v-if="filteredHotels.length > 0">
        <HotelCard v-for="(hotel, i) in filteredHotels" :key="hotel + i" :hotel="hotel" />
      </div>
      <div v-else>
        <h2>No result on search - try again</h2>
      </div>
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
      this.$store.commit("setFilteredHotels");
      this.$router.push({ path: "/result-page" });
    },
    sortHotelsByMaxPrice() {
      this.$store.commit("filterByMaxPrice");
      this.$router.push({ path: "/result-page" });
    },
    sortHotelsByRatings() {
      console.log("sorting ratings: ");
      this.$store.commit("setFilteredHotels");
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
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

#result-page {
  #sort-bar {
    height: fit-content;
  }
  .main-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .list-hotel {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      grid-gap: 10px;
      width: 100%;
      padding: 10px;
      justify-content: center;
    }
  }
}
</style>
