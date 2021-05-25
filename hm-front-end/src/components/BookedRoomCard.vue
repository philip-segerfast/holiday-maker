<template>
  <div class="bookedRoom-card">
    <h3>Room:{{ bookedRoom.name }}</h3>
    <h3>{{ bookedRoom.size }} m^2</h3>
    <h3 class="single-beds" v-if="bookedRoom.singleBedsAmount > 0">
      Number of single beds:{{ bookedRoom.singleBedsAmount }}
    </h3>
    <h3 class="double-beds" v-if="bookedRoom.doubleBedsAmount > 0">
      Number of double beds:{{ bookedRoom.doubleBedsAmount }}
    </h3>
  </div>
</template>

<script>
export default {
  props: ["bookedRoom"],

  computed: {},
};
</script>

<style scoped lang="scss">
.bookedRoom-card {
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
