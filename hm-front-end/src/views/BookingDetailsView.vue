<template>
  <div>
    <h3>BookingDetailsView</h3>
    <h4>{{ booking }}</h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
    };
  },
  computed: {
    booking() {
      return this.$store.state.bookingById;
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.$store.commit("setbookingId", this.id);
    this.$store.dispatch("fetchBookingById");
  },
};
</script>

<style></style>
