<template>
  <div class="main-container">
    <div v-for="hotel in hotels" :key="hotel.id" class="container">
      <NewHotelCard :hotel="hotel" />
    </div>
  </div>
</template>

<script>
import NewHotelCard from "../components/NewHotelCard.vue";
export default {
  data() {},
  components: {
    NewHotelCard,
  },
  computed: {
    hotels() {
      return this.$store.getters.getAllHotels;
    },
  },
};
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
.container {
  margin: 10px;
}
</style>
