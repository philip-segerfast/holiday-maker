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

      <div id="rating">
        <h2>Rate the hotel after visiting</h2>
        <select v-model="rating">
          <option disabled value="">Please select one</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <span>Selected: {{ rating }}</span>
        <label for="comments">Exp Month</label>
        <input type="text" id="comments" name="comments" placeholder="make a comment" />

        <button type="submit">Send</button>
      </div>

      <div id="v-image" class="split left"></div>
      <button @click="redirectToBookingDetailsView">Details</button>
      <button @click="cancelBooking">Cancel booking</button>

      <button @click="makeReview">fake review</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myRating: "5",
      myComment:
        "Dirty and ugly but cheap rooms. Recommend if you just need somewhere to sleep but doesn't care about service etc.",
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
      console.log("my rating is" + this.myRating);

      let hotelRating = {
        rating: this.myRating,
        comment: this.myComment,
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
