<template>
  <div class="container">
    <NewHotelCard /><!-- v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" -->
  </div>
</template>

<script>
import NewHotelCard from "../components/NewHotelCard.vue";
export default {
  data() {
  },
  components: {
    NewHotelCard,
  },
  computed: {
    hotels() {
      let hotels = this.$store.getters.getAllHotels;
      console.log(hotels);
      return hotels;
    }
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
