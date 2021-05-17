<template>
  <form id="search-bar-container" @submit.prevent="searchMethod">
    <SearchBox />
    <CheckInRange />
    <AmountOfPeople />
  </form>
  <div id="sort-bar">
    <select name="sortBy" id="select" v-model="sortBy">
      <option value="city">City</option>
      <option value="hotel-name">Hotel Name</option>
    </select>
    <button v-on:click="ascending = !ascending" class="sort-button">
      <i v-if="ascending" class="fa fa-sort-up"></i>
      <i v-else class="fa fa-sort-down"></i>
    </button>
  </div>
  <hr>
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
        console.log("klicked")
        this.$router.push({path: "/result-page"})
        this.$store.commit("setFilteredHotels")
      }
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
#sort-bar {
  width: 80%;
  // height: 80px;
  margin-left: 10px;
  background-color: #73d895;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

.sort-button {
  background-color: rgba(0,0,0,0);
  border: none;
  // height: 50px;
  height: 100%;
  width: 50px;
  &:hover {
    background-color: rgba(0,0,0, 0.2);
    cursor: pointer;
  }
}
</style>
