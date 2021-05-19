<template>
  <div class="home">
    <BookingList />
  </div>
</template>

<script>
import BookingList from "../components/BookingList";

export default {
  name: "Home",
  components: { BookingList }, 
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
