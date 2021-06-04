<template>
  <div class="review">
    <!--skapar form så användaren kan mata in sina uppgifter -->
    <form @submit.prevent="makeReview">
      <div v-show="inputs"></div>
      <input class="rating" v-model="yourRating" type="text" placeholder="First name" required />
      <input class="comments" v-model="my_comments" type="text" placeholder="Last name" required />
      <button type="submit">Send</button>
    </form>
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

  methods: {
    async makeReview() {
      console.log("review test");
      //skapar objekt hotelRating (
      let hotelRating = {
        rating: this.rating,
        comment: this.comment,
        authoor: { id: getUserId },
        hotel: { id: getHotelId },
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
  },
  computed: {
    getUserId() {
      return this.$store.getters.getUserId;
    },
  },
};
</script>
<style scoped lang="scss">
.Registration {
  display: inline-block;
  background-color: #1a88bb;
  border-radius: 30px;
  width: 250px;
}

.show-register {
  box-shadow: var(--box-shadow-outline-border);
  margin-right: 10px;
  background-color: rgba(230, 211, 48);
  border: none;
  height: 50px;
  height: 100%;
  width: 100px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
}
</style>
