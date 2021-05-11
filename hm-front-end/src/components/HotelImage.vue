<template>
  <div class="hotelImage-card">
 
     <img src="@/assets/images/hotell1.png" alt="" />
  <!--  <img src="@/assets/images/+{{hotel.image}}" alt="" /> -->
  </div>
</template>

<script>
export default {
  props: ["hotel"],

  computed: {},
};
</script>

<style scoped lang="scss">
.hotelImage-card {
  background-color: rgb(187, 202, 202);
  margin-bottom: 20px;
  margin: auto;
  padding: 10px;
  font-family: "Arial";
  text-align: left;
  border-radius: 30px;
  border: 5px solid whitesmoke;
  width: 50%;
}

</style>
