<!-- 

1. Component with - Hotel name and information (from Hotelpage?)
2. Login/register-components
3. List-component with bookingRoomCards-components
4. Payment-component
5. Price / confirm-booking-button

<Hotelinfo />
<Login />
<Register />
<BookingRoomList />
<Payment />
price etc

-->

<template>
  <body>
    <div class="split right">
      <h1>bookingView</h1>
      <h2>Rumslista{{ addedHotelRooms }}</h2>
    </div>

    <!--Lägger in och visar alla rum som finns i addedRooms -->
    <div id="rooms-container">
      <span class="room-list" v-if="addedHotelRooms.length > 0">
        <booking-room-card v-for="(room, i) in addedRooms" :key="room + i" :hotelRoom="room" />
      </span>
    </div>
  </body>
</template>

<script>
import BookingRoomCard from "../components/BookingRoomCard.vue";

export default {
  components: {
    BookingRoomCard,
  },

  computed: {
    addedHotelRooms() {
      return this.$store.getters.getAddedHotelRooms;
    },

    //hotelInfo() {
    //return this.$store.getters.getHotelById;
    //},
  },
};
</script>

<style scoped lang="scss">
body {
  background-color: #45c3d1;
  margin: 5%;
  display: inline;
}

.tag-list {
  display: inline-block;
  background-color: #2ea4b1;
  border-radius: 30px;
  border: 5px solid #5c8791;
  width: 20%;
}
.tag-list span {
  display: inline-block;
  font-size: 10px;
  padding: 5px;
}

.split {
  height: 320px;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 100px;
  overflow-x: hidden;
  padding-left: 20px;
}
.left {
  left: 0;
  background-color: #5c8791;
}
.right {
  right: 0;
  background-color: #5c8791;
}
img {
  display: center;
  border-radius: 20px;
  width: 200px;
  height: 200px;
  padding: 5px;
}

.room-list {
  left: 0;
  position: absolute;
  top: 45%;
  width: 100%;
  background-color: cadetblue;
}
.booking {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
