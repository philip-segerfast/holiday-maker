<template>
  <div class="hotelRoom-card">
    <h4>Room:{{ hotelRoom.name }}</h4>
    <h3>{{ hotelRoom.size }} m^2</h3>
    <h3 class="single-beds" v-if="hotelRoom.singleBedsAmount > 0">
      Single beds: {{ hotelRoom.singleBedsAmount }}
    </h3>
    <h3 class="double-beds" v-if="hotelRoom.doubleBedsAmount > 0">
      Double beds: {{ hotelRoom.doubleBedsAmount }}
    </h3>
    <h4>
      Number of extra beds allowed:{{ hotelRoom.maxAmountOfExtraBeds }} -Additional cost: See hotel
      description
    </h4>
    <h2>Price:{{ hotelRoom.baseNightPrice }}</h2>

    <button class="add" @click="addRoomsToBooking">Add room</button>
  </div>
</template>

<script>
export default {
  props: ["hotelRoom"],
  methods: {
    addRoomsToBooking() {
      this.$store.commit("addRoomToBooking", this.hotelRoom);
      console.log(this.hotelRoom);
    },
  },
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

.add {
  background-color: #4caf50; /* Green */
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  width: 100px;
  border-radius: 15px;
  cursor: pointer;
  padding: 10px;
  font-family: "Arial";
  border-radius: 30px;
  border: 5px solid #5c8791;
}
</style>
