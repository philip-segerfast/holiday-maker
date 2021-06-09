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
      <h3>Cost for extra bed: {{ hotelInfo.extraBedPrice }} | Location: {{ hotelInfo.address }}</h3>
      <!--Visar alla taggar som är kopplade till ett hotell  -->
      <span class="tag-list" v-for="tag in hotelInfo.hotelTags" :key="tag">
        <h3>{{ tag.label }}</h3>
      </span>

      <h3>{{ amountAdult }} adults and {{ amountChildren }} children</h3>
      <h3>Number of days: {{ nrDays }}</h3>

      <div class="livery">
        Livery Option Select between: <br />
        Self Catering {{ hotelInfo.selfCateringPrice }} SEK/day <br />
        Half Pension {{ hotelInfo.halfPensionPrice }} SEK/adult and day <br />
        Full Board {{ hotelInfo.fullBoardPrice }} SEK/adult and day <br />
        All Inclusive {{ hotelInfo.allInclusivePrice }} SEK/adult and day <br />

        <select
          name="liveryOption"
          @change="updateLivery"
          class="livery-control"
          v-model="selectedLiveryOption"
        >
          <option value="self">Self Catering</option>
          <option value="half">Half pension</option>
          <option value="full">Full Board</option>
          <option value="all">All Inclusive</option>
        </select>
      </div>
      <h2>Livery Cost {{ extraCostLivery }} SEK/day</h2>

      <div id="extraBeds">
        <h2>How many extra beds do you want?</h2>
        <input type="number" v-model="amountOfExtraBeds" min="0" @input="updateAmountOfExtraBeds" />
        <h2>price of your extrabeds {{ totalExtraBedsCost }} SEK</h2>
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

      <h2>Price Rooms {{ roomsCost }}SEK/day</h2>
      <h1>Total Price for Booking {{ totalBookingCost }}SEK</h1>
      <div id="payment-container">
        <StripeCheckout :hotelInfo="hotelInfo" :totalBookingCost="totalBookingCost" />
      </div>
    </div>
    <br />
  </body>
</template>

<script>
import LoginComponent from "../components/LoginComponent.vue";
import RegisterComponent from "../components/RegisterComponent.vue";
import BookingRoomCard from "../components/BookingRoomCard.vue";
import StripeCheckout from "../components/StripeCheckout.vue";
import moment from "moment";

export default {
  data() {
    return {
      amountOfExtraBeds: "0",
      hotelInfo: {},
      selectedLiveryOption: "self",
    };
  },
  methods: {
    updateAmountOfExtraBeds() {
      if (this.amountOfExtraBeds <= this.maxExtraBeds) {
      } else {
        this.amountOfExtraBeds = this.maxExtraBeds;
      }
    },
    updateLivery() {
      this.$store.commit("setLivery", this.selectedLiveryOption);
    },

    createBooking() {
      console.log(this.totalBookingCost);
    },
  },
  components: {
    BookingRoomCard,
    LoginComponent,
    RegisterComponent,
    BookingRoomCard,
    StripeCheckout,
  },
  computed: {
    addedHotelRooms() {
      return this.$store.getters.getAddedHotelRooms;
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
    extraCostLivery() {
      return this.$store.getters.getExtraCostLivery;
    },

    maxExtraBeds() {
      return this.$store.getters.getMaxExtraBeds;
    },
    totalBookingCost() {
      return (this.extraCostLivery + this.roomsCost) * this.nrDays + this.totalExtraBedsCost;
    },
    totalExtraBedsCost() {
      return this.hotelInfo.extraBedPrice * this.amountOfExtraBeds;
    },
    amountAdult() {
      return this.$store.getters.getAdultAmount;
    },
    amountChildren() {
      return this.$store.getters.getChildrenAmount;
    },
  },
  mounted() {
    this.hotelInfo = this.$store.getters.getHotelToBook;
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
