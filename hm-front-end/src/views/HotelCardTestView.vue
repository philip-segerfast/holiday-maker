<template>
  <div class="container">
    <NewHotelCard v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" />
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
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
