<template>
  <div class="hotelRoom-card">
    <h2>Room:{{ hotelRoom.name }}</h2>
    <h3>Size:{{ hotelRoom.size }} m^2</h3>
    <h3 class="single-beds" v-if="hotelRoom.singleBedsAmount > 0">
      Single beds: {{ hotelRoom.singleBedsAmount }}
    </h3>
    <h3 class="double-beds" v-if="hotelRoom.doubleBedsAmount > 0">
      Double beds: {{ hotelRoom.doubleBedsAmount }}
    </h3>
    <h4>
      Number of extra beds allowed:{{ hotelRoom.maxAmountOfExtraBeds }} Additional cost: See hotel
      description
    </h4>
    <h2>Price:{{ hotelRoom.baseNightPrice }} SEK</h2>

    <button class="add" @click="addRoomsToBooking">Add room</button>
  </div>
</template>

<script>
export default {
  props: ["hotelRoom"],
  methods: {
    // addRoomsToBooking adds room to list addedHotelRooms in store, it also ads the total cost for rooms
    // and it also updates the max amount of extrabeds that can be added in the booking.
    addRoomsToBooking() {
      this.$store.commit("addRoomToBooking", this.hotelRoom);
      this.$store.commit("updateRoomsCost", this.hotelRoom.baseNightPrice);
      this.$store.commit("updateMaxExtraBeds", this.hotelRoom.maxAmountOfExtraBeds);
    },
  },
};
</script>

<style scoped lang="scss">
.hotelRoom-card {
  background-color: rgb(243, 243, 243);
  margin: auto;
  padding: 10px;
  font-family: "Arial";
  text-align: left;
  border-radius: 30px;
  border: 5px solid #5c8791;
  width: 50%;
  font-family: "Arial";
  font-size: 20px;
}

.add {
  background-color: #4caf50; /* Green */
  color: white;
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
