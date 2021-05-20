<template>
  <div class="hotelRoom-card">
    <h3>Room:{{ hotelRoom.name }}</h3>
    <h3>{{ hotelRoom.size }} m^2</h3>
    <h3 class="single-beds" v-if="hotelRoom.singleBedsAmount > 0">
      Number of single beds:{{ hotelRoom.singleBedsAmount }}
    </h3>
    <h3 class="double-beds" v-if="hotelRoom.doubleBedsAmount > 0">
      Number of double beds:{{ hotelRoom.doubleBedsAmount }}
    </h3>
    <h3>Number of extra beds allowed:{{ hotelRoom.maxAmountOfExtraBeds }}</h3>
    <h2>Price:{{ hotelRoom.baseNightPrice }}</h2>

    <button>Add room</button>
  </div>
</template>

<script>
export default {
  props: ["hotelRoom"],

  computed: {},
};
</script>

<style scoped lang="scss">
.hotelRoom-card {
  background-color: #2ea4b1;
  margin: auto;
  padding: 10px;
  font-family: "Arial";
  text-align: left;
  border-radius: 30px;
  border: 5px solid #5c8791;
  width: 50%;
}
button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
