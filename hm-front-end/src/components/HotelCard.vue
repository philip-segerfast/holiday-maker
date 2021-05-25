<template>
  <div class="hotel-card" @click="redirectToHotelView">
    <span>{{ "Hotel: " + hotel.name }}</span>
    -
    <span>{{ "City: " + hotel.city }}</span>
    -
    <span>{{ "Prices from: " + hotel.minRoomPrice }}</span>
  </div>
</template>

<script>
export default {
  props: ["hotel"],

  methods: {
    redirectToHotelView() {
      this.$store.commit("setHotelId", this.hotel.id);
      const routerUrl = "/hotelView/" + this.hotel.id;
      this.$router.push({ path: routerUrl });
    },
  },
};
</script>

<style scoped lang="scss">
.hotel-card {
  background-color: lightgray;
  margin-bottom: 20px;
  padding: 10px;
  font-family: "Arial";
  border-radius: 30px;
  border: 5px solid whitesmoke;
}
</style>
