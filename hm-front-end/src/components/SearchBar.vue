<template>
  <div>
    <form id="search-bar-container" @submit.prevent="searchMethod">
      <SearchBox />
      <CheckInRange />
      <AmountOfPeople />
    </form>
    <div id="sort-bar">
      <h3>
        Sort by :
        <button @click="sortHotelRoomsByPrice">Sort Rooms</button>
        <button @click="sortHotelsByPrice">Sort Hotels</button>
      </h3>
    </div>
    <hr />
    <button @click="filterHotels">Search</button>
  </div>
</template>

<script>
import SearchBox from "../components/SearchBox.vue";
import CheckInRange from "../components/CheckInRange.vue";
import AmountOfPeople from "../components/AmountOfPeople.vue";

export default {
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
    hotelRooms() {
      return this.$store.getters.getHotelRooms;
    },
  },
  methods: {
    filterHotels() {
      // Sök efter hotel i searchfältet (filtrerar hotelen) click--> push till result-page
      //this.$store.dispatch("fetchAllHotels")
      this.$store.commit("setFilteredHotels");
      this.$router.push({ path: "/result-page" });
    },
    sortHotelsByPrice() {
      this.$store.commit("setSortedHotels");
      this.$router.push({ path: "/result-page" });
    },
    sortHotelRoomsByPrice() {
      console.log("sorting: ");
      this.$router.push({ path: "/hotelView" });
      this.$store.commit("setSortedRooms");
    },
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
  background-color: rgba(0, 0, 0, 0);
  border: none;
  // height: 50px;
  height: 100%;
  width: 100px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
}
</style>
