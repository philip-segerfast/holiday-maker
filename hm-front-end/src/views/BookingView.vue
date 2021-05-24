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
    <div class="hotel">
      <h1>{{ hotelInfo.name }}</h1>
      <h2>check-in date: {{ startDate }} - check-out date: {{ endDate }}</h2>
      <h2>{{ hotelInfo.description }}</h2>
      <div id="v-image" class="split left">
        <span v-for="image in hotelInfo.images" :key="image">
          <img v-bind:src="`http://localhost:5000/uploads/${image.fileName}`" />
        </span>
      </div>
      <h3>Cost Extrabed: {{ hotelInfo.extraBedPrice }} | Location: {{ hotelInfo.address }}</h3>
      <!--Visar alla taggar som är kopplade till ett hotell  -->
      <span class="tag-list" v-for="tag in hotelInfo.hotelTags" :key="tag">
        <h3>{{ tag.label }}</h3>
      </span>
      <h2>Number of adult: {{ amountAdult }}</h2>
      <h1>Total Price for Booking {{ totalCost }}kr</h1>
    </div>

    <!--Lägger in och visar alla rum som finns i addedRooms -->
    <div id="rooms-container">
      <span class="room-list">
        <Booking-room-card v-for="(room, i) in addedHotelRooms" :key="room + i" :hotelRoom="room" />
      </span>
    </div>
    <div id="payment-cotainer">
      <span class="payment-cards">
        <PaymentCard v-for="(everyCard, i) in paymentCards" :key="i" :card="everyCard" />
      </span>
    </div>
  </body>
</template>

<script>
import BookingRoomCard from "../components/BookingRoomCard.vue";
import PaymentCard from "../components/PaymentCard.vue";
import moment from "moment";

export default {
  components: {
    BookingRoomCard,
    PaymentCard,
  },
  computed: {
    addedHotelRooms() {
      return this.$store.getters.getAddedHotelRooms;
    },

    hotelInfo() {
      return this.$store.getters.getHotelToBook;
    },
    paymentCards() {
      return this.$store.state.paymentCards;
    },
    startDate() {
      var date = new Date(this.$store.getters.getStartDate * 1000);
      return moment(date).format("YYYY-MM-DD");
    },
    endDate() {
      var date = new Date(this.$store.getters.getEndDate * 1000);
      return moment(date).format("YYYY-MM-DD");
    },
    totalCost() {
      return this.$store.getters.getTotalCost;
    },
    amountAdult() {
      return this.$store.getters.getAdultAmount;
    },
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
  width: 200px;
}
.tag-list span {
  display: inline-block;
  font-size: 10px;
  padding: 5px;
}

img {
  display: center;
  border-radius: 20px;
  width: 200px;
  height: 200px;
  padding: 5px;
}

.room-list {
  display: inline-block;
  width: 100%;
  background-color: rgba(95, 158, 160, 0.24);
}
.payment-container {
  display: inline-block;
  width: 100%;
  background-color: rgba(95, 158, 160, 0.24);
}
</style>
