<template>
  <div>
    <h3>BookingDetailsView</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
    };
  },
  mounted() {
    this.id = this.$route.params.id;
  },
};
</script>

<style></style>
