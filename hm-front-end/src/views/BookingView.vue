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
    <div class="components">
      <div class="sign-up" v-if="$store.getters.getLoggedInUser == null">
        <div id="login-register-cotainer">
          <span class="login-component">
            <LoginComponent />
          </span>
        </div>
        <br />
        <div>
          <span class="register-component">
            <RegisterComponent />
          </span>
        </div>
      </div>
    </div>
    <br />
    <div class="hotel">
      <h1>{{ hotelInfo.name }}</h1>
      <h2>check-in date: {{ startDate }} | check-out date: {{ endDate }}</h2>
      <h2>{{ hotelInfo.description }}</h2>
      <div id="v-image">
        <span v-for="image in hotelInfo.images" :key="image">
          <img v-bind:src="`http://localhost:5000/uploads/${image.fileName}`" />
        </span>
      </div>
      <h3>Cost Extrabed: {{ hotelInfo.extraBedPrice }} | Location: {{ hotelInfo.address }}</h3>
      <!--Visar alla taggar som är kopplade till ett hotell  -->
      <span class="tag-list" v-for="tag in hotelInfo.hotelTags" :key="tag">
        <h3>{{ tag.label }}</h3>
      </span>

      <h3>{{ amountAdult }} Adults and {{ amountChildren }} Children</h3>
      <h3>Number of days: {{ nrDays }}</h3>

      <div class="livery">
        Livery Option Select between: <br />
        Self Catering {{ hotelInfo.selfCateringPrice }} Euro/(Booking and day) <br />
        Half Pension {{ hotelInfo.halfPensionPrice }} Euro/(Adult and day) <br />
        Full Board {{ hotelInfo.fullBoardPrice }} Euro/(Adult and day)

        <select
          name="liveryOption"
          @change="updateLivery($event)"
          class="livery-control"
          v-model="key"
        >
          <option value="No catering"></option>
          <option value="self catering price">Self Catering</option>
          <option value="half pension price">Half pension</option>
          <option value="full board price">Full Board</option>
        </select>
      </div>
      <h2>Extra Livery {{ extraCost }}Euro/day</h2>

      <div id="extraBeds">
        <h2>How many extra beds do you want?</h2>
        <input type="number" min="0" @input="updateAmountOfExtraBeds" />
      </div>

      <!--Lägger in och visar alla rum som finns i addedRooms -->
      <div id="rooms-container">
        <span class="room-list">
          <Booking-room-card
            v-for="(room, i) in addedHotelRooms"
            :key="room + i"
            :hotelRoom="room"
          />
        </span>
      </div>

      <h2>Total Price for Rooms {{ roomsCost }}Euro/day</h2>
      <h1>Total Price for Booking {{ totalBookingCost }}Euro</h1>
      <!--Mockup payment -->
      <div id="payment-cotainer">
        <span class="payment-cards">
          <PaymentCard />
        </span>
      </div>
    </div>
    <br />
    <button @click="createBooking" class="confirm-booking">Confirm Booking</button>
  </body>
</template>

<script>
import LoginComponent from "../components/LoginComponent.vue";
import RegisterComponent from "../components/RegisterComponent.vue";
import BookingRoomCard from "../components/BookingRoomCard.vue";
import PaymentCard from "../components/PaymentCard.vue";
import moment from "moment";

export default {
  components: {
    BookingRoomCard,
    PaymentCard,
  },
  data: function () {
    return {
      key: "",
      extraLiveryCost: 0,
    };
  },
  methods: {
    updateAmountOfExtraBeds() {
      alert("hej");
    },
    updateLivery(event) {
      this.$store.commit("setLivery", event.target.value);
    },

    createBooking() {
      console.log(this.totalBookingCost);
      this.$store.commit("setTotalCost", this.totalBookingCost);
      this.$store.dispatch("fetchCreateBooking");

      const routerUrl = "/";
      this.$router.push({ path: routerUrl });
    },
  },
  components: {
    LoginComponent,
    RegisterComponent,
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
    nrDays() {
      var dateS = this.$store.getters.getStartDate;
      var dateE = this.$store.getters.getEndDate;
      var dateDiff = (dateE - dateS) / (60 * 60 * 24);
      return dateDiff;
    },
    roomsCost() {
      return this.$store.getters.getRoomsCost;
    },
    extraCost() {
      return this.$store.getters.getExtraCostLivery;
    },
    maxExtraBeds() {
      return this.$store.getters.getMaxExtraBeds;
    },
    totalBookingCost() {
      return (this.extraCost + this.roomsCost) * this.nrDays; //+ this.extraBedCost
    },
    amountAdult() {
      return this.$store.getters.getAdultAmount;
    },
    amountChildren() {
      return this.$store.getters.getChildrenAmount;
    },
  },
};
</script>

<style scoped lang="scss">
.components {
  margin-right: 10px;
  display: inline-block;
  background-color: #1a88bb;
  border-radius: 12px;
}
.hotel {
  background-color: #3fb0bd;
  border-radius: 10px;
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
}
.payment-container {
  display: inline-block;
  width: 100%;
  background-color: rgba(95, 158, 160, 0.24);
}
.confirm-booking {
  display: inline-block;
  border: 4px;
  border-radius: 20px;
  background-color: rgb(15, 192, 68);
  padding: 20px 18px;
  cursor: pointer;
  font-size: 32px;
}
</style>
