<template>
  <form id="search-bar-container" @submit.prevent="searchMethod">
    <SearchBox />
    <CheckInRange />
    <AmountOfPeople />
  </form>
  <button @click="filterHotels">Search</button>
</template>

<script>
import SearchBox from "../components/SearchBox.vue";
import CheckInRange from "../components/CheckInRange.vue";
import AmountOfPeople from "../components/AmountOfPeople.vue";

export default {
  data() {
    return {};
  },
  components: {
    CheckInRange,
    SearchBox,
    AmountOfPeople,
  },
  computed: {
    hotels() {
      return this.$store.getters.getHotelSearch;
    },
    searchValue() {
      return this.$store.getters.getSearchText;
    },
  },
  methods: {
    filterHotels() {
        // Sök efter hotel i searchfältet (filtrerar hotelen) click--> push till result-page
        //this.$store.dispatch("fetchAllHotels")
        this.$store.commit("setFilteredHotels");
        this.$router.push({path: "/result-page"});
      }
  },
  mounted() {
     this.$store.commit("updateSearchText", "");
  },
};
</script>

<style scoped lang="scss">
#search-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
}
</style>
