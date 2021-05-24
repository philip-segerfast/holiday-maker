<template>
  <div class="home">
    <BookingList />
  </div>
</template>

<script>
import BookingList from "../components/bookingList";

export default {
  name: "Home",
  components: { BookingList },
  computed: {},
  methods: {},
  mounted() {
    this.$store.dispatch("fetchUserBookingList");
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
