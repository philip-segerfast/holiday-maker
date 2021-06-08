<!-- eslint-disable -->
<template>
  <div class="review-card-container">
    <div class="info-container">
      <h2>Guest Reviews</h2>
      <div class="stars">
        <i v-for="n in theAmountOfStars" v-bind:key="n" class="fa fa-star"></i>
      </div>
      <div class="header">Comment: {{ hotelReview.comment }}</div>
      <div class="header">Guest: {{ hotelReview.author.first_name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hotelReview"],

  methods: {},
  mounted() {},
  computed: {
    theAmountOfStars() {
      let rounded = Math.round(parseInt(this.hotelReview.rating));
      return rounded;
    },
  },
};
</script>

<style lang="scss" scoped>
.stars {
  color: rgb(243, 169, 32);
}
.review-card-container {
  padding: 0;
  display: grid;
  grid-template-rows: min-content auto;
  width: 225px;
  height: 250px;
  max-height: 250px;
  overflow: hidden;
  border-radius: 15px;
  cursor: pointer;
  border: 1px solid rgb(22, 19, 19);
  background-color: rgb(196, 84, 84);

  .info-container {
    display: grid;
    grid-template-rows: repeat(6, min-content) auto;
    flex-direction: column;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    padding: 0 5px 15px 5px;
    .header {
      font-size: 150%;
      text-align: center;
    }
    .stars {
      text-align: center;
    }
    .imp-info-container {
      display: flex;
      .right {
        margin-left: auto;
      }
    }
    description-container {
      overflow: hidden;
      .description {
        font-size: 65%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
        overflow-y: scroll;
      }
    }
  }
}
</style>
