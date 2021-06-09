<!-- eslint-disable -->
<template>
  <div class="hotel-card-container" @click="redirectToHotelView">
    <div class="image-container">
      <img
        v-if="hotel.images.length > 0"
        v-bind:src="`http://localhost:5000/uploads/${hotel.images[0].thumbnailFileName}`"
      />
    </div>
    <div class="info-container">
      <div class="header">{{ hotel.name }}</div>
      <div class="stars">
        <i v-for="n in theAmountOfStars" v-bind:key="n" class="fa fa-star"></i>
      </div>
      <div class="separator"></div>
      <div class="city-price-container">
        <div class="imp-info-container">
          <span class="left">City</span>
          <span class="right">{{ hotel.city }}</span>
        </div>
        <div class="imp-info-container">
          <span class="left">Price</span>
          <!-- eslint-disable-next-line -->
          <span class="right">
            {{ hotel.minRoomPrice }}

            <span style="font-size: 75%">SEK/night</span>
          </span>
        </div>
      </div>
      <div class="separator"></div>
      <span class="description">
        {{ hotel.description }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hotel"],

  methods: {
    redirectToHotelView() {
      this.$store.commit("setHotelId", this.hotel.id);
      const routerUrl = "/hotelView/" + this.hotel.id;
      this.$router.push({ path: routerUrl });
    },
  },
  mounted() {},
  computed: {
    theAmountOfStars() {
      let rounded = Math.round(parseInt(this.hotel.averageRating));
      return rounded;
    },
  },
};
</script>

<style lang="scss" scoped>
.stars {
  color: rgb(243, 169, 32);
}
.hotel-card-container {
  padding: 0;
  display: grid;
  grid-template-rows: min-content auto;
  width: 225px;
  height: 350px;
  max-height: 350px;
  border-radius: 15px;
  cursor: pointer;
  border: 1px solid rgb(230, 230, 230);
  background-color: rgb(243, 243, 243);
  .image-container {
    display: flex;
    position: relative;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    img {
      width: 100%;
      height: 125px;
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
    }
    .like {
      position: absolute;
      width: 24px;
      height: 24px;
      top: 10px;
      right: 10px;
    }
  }
  .info-container {
    display: grid;
    grid-template-rows: repeat(6, min-content) auto;
    flex-direction: column;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    padding: 0 5px 15px 5px;
    //overflow-x: hidden;
    .header {
      font-size: 125%;
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
    .description {
      position: relative;
      display: inline-block;
      text-align: left;
      height: 110px;
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
      padding-bottom: 10px;
      padding-top: 3px;

      overflow-y: scroll;

      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
