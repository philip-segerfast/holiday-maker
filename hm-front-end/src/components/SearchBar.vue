<template>
  <form @submit.prevent="searchMethod">
    <input
      type="text"
      id="search"
      placeholder="Where do you want to travel?"
      v-model="searchText"
    />
    <div id="period"></div>
    <div id="people-amount"></div>
    <button type="submit">Search</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },

  //Kolla upp "fetchHotels"
  methods: {
    searchMethod() {
      let searchText = this.searchText;
      console.log("searchtext is: " + searchText);
      this.$store.commit("setHotelSearch", searchText);
      this.$store.dispatch("fetchHotelSearch");
    },
  },

  components: {},

  computed: {
    hotels() {
      return this.$store.getters.getHotelSearch;
    },
  },

  // mounted() {
  //    this.$store.dispatch("fetchHotel")
  // }
};
</script>

<style></style>
