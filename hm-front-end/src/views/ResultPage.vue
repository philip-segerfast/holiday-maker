<template>
  <div class="main-container">
    <!-- Insert hotels in hotelsList (Nestlar componenten HotelCard i ResultPage)-->
    <!-- Loopar ut (v-for) listan av hotel enskilt = Skapar varje "hotel" som en egen komponent-->
    <ul class="list-hotel" v-if="filteredHotels.length > 0">
      <HotelCard
        v-for="(hotel, i) in filteredHotels"
        :key="hotel + i"
        :hotel="hotel"
        class="container"
      />
    </ul>
    <ul v-else>
      <h2>No result on search - try again</h2>
    </ul>
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

<style scoped lang="scss">
.main-container {
  position: absolute;
  top: 450px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #7db5c1;
}
.list-hotel {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(7, calc(250px - 20px));
  grid-template-rows: minmax(150px, 1fr);
}
.container {
  display: flex;
  display: block;
  margin: 10px;
}
</style>
