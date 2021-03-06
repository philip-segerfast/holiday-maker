<template>
  <body>
    <div v-if="hotel == null">
      <h1>Loading...</h1>
    </div>
    <div v-else>
      <div class="hotel-info">
        <h1>{{ hotel.name }}</h1>
        <div class="stars">
          <i v-for="n in theAmountOfStars" v-bind:key="n" class="fa fa-star"></i>
        </div>
        <!--Visar alla bilder som är kopplade till ett hotell -->
        <span v-for="image in hotel.images" :key="image">
          <img v-bind:src="`http://localhost:5000/uploads/${image.fileName}`" />
        </span>
        <h2>Check-in date: {{ startDate }} | Check-out date: {{ endDate }}</h2>
        <h2>{{ amountAdult }} adults and {{ amountChildren }} children</h2>
        <h4>{{ hotel.description }}</h4>
        <h4>Cost Extrabed: {{ hotel.extraBedPrice }} | Location: {{ hotel.address }}</h4>
        <h4>
          Distance to beach: {{ hotel.beachDistance }} km | Distance to center:
          {{ hotel.centerDistance }} km
        </h4>
        <!--Visar alla taggar som är kopplade till ett hotell  -->
        <span class="tag-list" v-for="tag in hotel.hotelTags" :key="tag">
          <h4>{{ tag.label }}</h4>
        </span>
        <div id="sort-bar">
          <h4>
            Sort rooms:
            <button class="btn" @click="setSortedRoomsAscending">Min Price</button>
            <button class="btn" @click="setSortedRoomsDescending">Max Price</button>
          </h4>
        </div>
        <h3>
          Add rooms and press book
          <button class="booking" @click="redirectToBookingView">Book</button>
        </h3>
      </div>

      <!--Lägger in och visar alla rum som finns i rooms, Hämtade från store fetchHotelRoomsByHotel() -->
      <div class="room-list" v-if="rooms.length > 0">
        <hotel-room-card v-for="room in rooms" :key="room.id" :hotelRoom="room" />
      </div>
    </div>

    <div class="review-list" v-if="hotel.reviews.length > 0">
      <review-card v-for="review in hotel.reviews" :key="review.id" :hotelReview="review" />
    </div>
  </body>
</template>

<script>
import HotelRoomCard from "../components/HotelRoomCard.vue";
import reviewCard from "../components/reviewCard.vue";
import moment from "moment";

export default {
  watch: {
    rounded(val) {
      let newVal = Math.round(val);
      this.val = newVal;
    },
  },
  components: {
    HotelRoomCard,
    reviewCard,
  },
  data() {
    return {
      rooms: [],
      reviews: [],
    };
  },
  methods: {
    redirectToBookingView() {
      this.$store.commit("setHotelToBook", this.hotel);
      const routerUrl = "/bookingView";
      this.$router.push({ path: routerUrl });
    },
    sortHotelRoomsByPrice() {
      console.log("sorting min price: ");
      this.$store.commit("setSortedRooms");
    },
    sortHotelRoomsByMaxPrice() {
      console.log("sorting max price: ");
      this.$store.commit("setSortedRoomsDescending");
      this.$router.push({ path: "/hotelView" });
    },
    setSortedRoomsAscending() {
      this.rooms.sort((price1, price2) => {
        if (price1.baseNightPrice < price2.baseNightPrice) {
          return -1;
        }
        if (price1.baseNightPrice > price2.baseNightPrice) {
          return 1;
        }
        return 0;
      });
    },
    setSortedRoomsDescending() {
      let maxPrice = this.rooms.sort((maxPrice1, maxPrice2) => {
        console.log(maxPrice1.baseNightPrice);
        if (maxPrice1.baseNightPrice > maxPrice2.baseNightPrice) {
          return 1;
        }
        if (maxPrice1.baseNightPrice < maxPrice2.baseNightPrice) {
          return -1;
        }
        return 0;
      });
      maxPrice.reverse();
    },
  },
  computed: {
    startDate() {
      var date = new Date(this.$store.getters.getStartDate * 1000);
      return moment(date).format("YYYY-MM-DD");
    },
    endDate() {
      var date = new Date(this.$store.getters.getEndDate * 1000);
      return moment(date).format("YYYY-MM-DD");
    },
    amountAdult() {
      return this.$store.getters.getAdultAmount;
    },
    amountChildren() {
      return this.$store.getters.getChildrenAmount;
    },
    hotelId() {
      return this.$route.params.id;
    },
    hotel() {
      return this.$store.getters.getHotelById(this.hotelId);
    },
    filteredRooms() {
      return this.$store.getters.getFilteredRooms(this.hotel);
    },
    theAmountOfStars() {
      let rounded = Math.round(parseInt(this.hotel.averageRating));
      return rounded;
    },
  },
  mounted() {
    this.rooms = this.$store.getters.getFilteredRooms(this.hotel);
  },
};
</script>

<style scoped lang="scss">
.stars {
  color: rgb(243, 169, 32);
}
.btn {
  margin-right: 10px;
  background-color: rgba(230, 211, 48);
  border: none;
  height: 50px;
  height: 100%;
  width: 100px;
  border-radius: 15px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
}
.components {
  margin-right: 10px;
  display: inline-block;
  background-color: #1a88bb;
  border-radius: 12px;
}
.total-info {
  background-color: #3fb0bd;
  border-radius: 10px;
}
.tag-list {
  display: inline-block;
  background-color: #2ea4b1;
  border-radius: 15px;
  border: 2px solid #5c8791;
  width: 150px;
}
.tag-list span {
  display: inline-block;
  font-size: 8px;
  padding: 2px;
}
img {
  display: center;
  border-radius: 20px;
  width: 200px;
  height: 200px;
  padding: 5px;
}

.room-list {
  display: inline;
  width: 100%;
  background-color: cadetblue;
}
.review-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-gap: 10px;
  width: 100%;
  padding: 10px;
  justify-content: center;
}
.booking {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  text-align: center;
  font-family: "Arial";
  display: inline-block;
  font-size: 30px;
  margin: 4px 2px;
  width: 200px;
  border-radius: 15px;
  cursor: pointer;
}
</style>
