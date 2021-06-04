<template>
  <div class="booking-card">
    <div>
      <h3>{{ userBooking.hotel.name }}</h3>
      <h3>"Rating of Hotel is:{{ userBooking.hotel.averageRating }}</h3>
      <!--<h3>"Comments about Hotel is:{{ userBooking.hotel.reviews }}</h3> 
      HUR VISAR VI COMMENTS -->

      <!-- Shows first image in list of images in hotel object -->
      <img v-bind:src="`http://localhost:5000/uploads/${userBooking.hotel.images[0].fileName}`" />

      <h4>
        Arrival: {{ bookedFromDate }}. <br />
        Checkout: {{ bookedToDate }}.
      </h4>
      <form @submit.prevent="makeReview">
        <div id="rating">
          <h2>Rate the hotel after visiting</h2>

          <select v-model="rating" required>
            <option disabled value="">Please select one</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <span>{{ rating }}/5 ⭐</span>
          <label for="comments">Exp Month</label>
          <input
            v-model="comment"
            type="text"
            id="comments"
            name="comments"
            placeholder="type here to describe your experience in this hotel"
            required
          />

          <button type="submit">Post review</button>
        </div>
      </form>

      <div id="v-image" class="split left"></div>
      <button @click="redirectToBookingDetailsView">Details</button>
      <button @click="cancelBooking">Cancel booking</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: "",
      comment: "",
    };
  },
  props: ["userBooking"],
  computed: {
    // Changes epoch time format to normal date format
    bookedFromDate() {
      return new Date(this.userBooking.fromTime * 1000).toLocaleString();
    },
    bookedToDate() {
      return new Date(this.userBooking.toTime * 1000).toLocaleString();
    },
  },
  methods: {
    async makeReview() {
      //console.log("review test");
      //console.log("Hotel id" + this.userBooking.hotel.id);
      //console.log("user id" + this.userBooking.user.id);
      console.log("my rating is" + this.rating);

      let hotelRating = {
        rating: this.rating,
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
</style>
