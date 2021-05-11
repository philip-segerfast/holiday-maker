<!-- eslint-disable -->
<template>
  <div class="hotel-card-container">
    <div class="image-container">
      <span class="material-icons like">
        favorite_border
      </span>
      <img src="../assets/images/superhotel.jpg">
    </div>
    <div class="info-container">
      <div class="header">Super Hotel<!--{{hotel.name}}--></div>
      <div class="stars">★★★★☆</div>
      <div class="separator"></div>
      <div class="city-price-container">
        <div class="imp-info-container">
          <span class="left">City</span>
          <span class="right"><!-- {{hotel.city}} -->Malmö</span>
        </div>
        <div class="imp-info-container">
          <span class="left">Price</span>
          <!-- eslint-disable-next-line -->
          <span class="right"><!-- {{hotel.selfCateringPrice}} -->750<span style="font-size: 75%;">SEK/night</span></span>
        </div>
      </div>
      <div class="separator"></div>
      <div class="description">
        <!--{{hotel.description}}-->
        A really sick hotel with everything you could ever ask for.
        Breakfast, lunch and dinner included for all rooms. 
        What else could you ask for?
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hotel"],
}
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
      height: auto;
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
    grid-template-rows: repeat(5, min-content) auto;
    flex-direction: column;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    width: 100%;
    max-height: 100%;
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
      .left {
        display: inline-block;
      }
      .right {
        display: inline-block;
        margin-left: auto;
      }
    }
    .description {
      height: 60px;
      font-size: 65%;
      overflow-y: scroll;
    }
  }
}
</style>
