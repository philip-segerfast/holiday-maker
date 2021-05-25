<!-- eslint-disable -->
<template>
  <div class="hotel-card-container" @click="redirectToHotelView">
    <div class="image-container">
      <span class="material-icons like"> favorite_border </span>
      <!-- <img src="../assets/images/superhotel.jpg" /> -->

      <img
        v-if="hotel.images.length > 0"
        v-bind:src="`http://localhost:5000/uploads/${hotel.images[0].fileName}`"
      />
    </div>
    <div class="info-container">
      <div class="header">{{ hotel.name }}</div>
      <div class="stars">★★★★☆</div>
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
      <div class="description-container">
        <span class="description">
          {{ hotel.description }}
        </span>
        -->
      </div>
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
};
</script>

<style lang="scss" scoped>
.hotel-card-container {
  padding: 0;
  display: grid;
  grid-template-rows: min-content auto;
  width: 225px;
  height: 350px;
  max-height: 350px;
  overflow: hidden;
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
      height: 100px;
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
    .header {
      font-size: 150%;
      text-align: center;
    }
    .stars {
      text-align: center;
    }
    .separator {
      height: 2px;
      border-radius: 1px;
      width: 100%;
      background-color: rgb(230, 230, 230);
      justify-self: center;
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
