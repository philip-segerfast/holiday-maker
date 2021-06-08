<template>
  <div class="booking-card">
    <div>
      <h3>{{ userBooking.hotel.name }}</h3>
      <div class="stars">
        <i v-for="n in theAmountOfStars" v-bind:key="n" class="fa fa-star"></i>
      </div>

      <!-- Shows first image in list of images in hotel object -->
      <img v-bind:src="`http://localhost:5000/uploads/${userBooking.hotel.images[0].fileName}`" />

      <h4>
        Arrival: {{ bookedFromDate }}. <br />
        Checkout: {{ bookedToDate }}.
      </h4>

      <div id="v-image" class="split left"></div>
      <button @click="redirectToBookingDetailsView">Details</button>
      <button @click="cancelBooking">Cancel booking</button>

      <div v-if="checkoutTimeStamp > dateTodayStamp">
        <form @submit.prevent="makeReview">
          <div v-show="notRated" id="rating">
            <h2>Rate the hotel after visiting</h2>

            <select v-model="rating" required>
              <option disabled value="">Please select one</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <span>{{ rating }}/5 ⭐</span>
            <input
              v-model="comment"
              type="text"
              id="comments"
              name="comments"
              placeholder="type here to describe your experience in this hotel"
              required
            />
            <button id="sendComment" type="submit">Post review</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: "",
      comment: "",
      notRated: true,
    };
  },
  props: ["userBooking"],

  computed: {
    theAmountOfStars() {
      let rounded = Math.round(parseInt(this.userBooking.hotel.averageRating));
      return rounded;
    },
    // Changes epoch time format to normal date format
    bookedFromDate() {
      return new Date(this.userBooking.fromTime * 1000).toLocaleString();
    },
    bookedToDate() {
      return new Date(this.userBooking.toTime * 1000).toLocaleString();
    },
    checkoutTimeStamp() {
      return this.userBooking.toTime;
    },
    dateTodayStamp() {
      return Date.now();
    },
  },
  methods: {
    async makeReview() {
      //skapar ett objekt hotelRating
      let hotelRating = {
        rating: this.rating.toString(),
        comment: this.comment,
        author: {
          id: this.userBooking.user.id,
        },
        hotel: {
          id: this.userBooking.hotel.id,
        },
      };
      //gör en POST request
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotelRating),
      };
      await fetch("/rest/hotels/reviews/add", request);
      this.notRated = false;
    },
    redirectToBookingDetailsView() {
      const routerUrl = "/bookingdetailsview/" + this.userBooking.id;
      this.$router.push({ path: routerUrl });
    },
    async cancelBooking() {
      // async/await makes fetchDeleteBooking finish before reloading page
      await this.$store.dispatch("fetchDeleteBooking", { id: this.userBooking.id });
      // Reloads page to show updated list of bookings
      this.$router.go();
    },
  },
};
</script>

<style scoped lang="scss">
.booking-card {
  background-color: lightgray;
  margin-bottom: 20px;
  padding: 10px;
  font-family: "Arial";
  border-radius: 30px;
  border: 5px solid whitesmoke;
}
img {
  display: center;
  border-radius: 20px;
  width: 200px;
  height: 200px;
  padding: 5px;
}
#rating {
  width: 250px;
  border-radius: 30px;
  border: 5px solid whitesmoke;
}
</style>
