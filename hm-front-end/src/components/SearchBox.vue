<template>
  <!-- eslint-disable-next-line -->
  <input type="text" id="search" placeholder="Where do you want to travel?" @input="updateSearchText" />
</template>

<script>
export default {
  methods: {
    updateSearchText(e) {
      this.$store.commit("updateSearchText", e.target.value);
    },
  },
};
</script>

<style>
#search {
  width: 190px;
}
</style>
