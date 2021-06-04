<template>
  <div>
    <h2>Booking Successfull</h2>
    <button @click="redirectToHome">See my bookings</button>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style></style>
