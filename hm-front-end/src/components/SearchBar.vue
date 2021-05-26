<template>
  <div class="big-container">
    <div id="search-bar-container">
      <div class="search-bar-item">
        <SearchBox />
      </div>
      <div class="search-bar-item">
        <CheckInRange />
      </div>
      <div class="search-bar-item">
        <AmountOfPeople />
      </div>
      <div class="search-bar-item">
        <button class="search-button" @click="filterHotels">Search</button>
      </div>
    </div>
    <div id="sort-bar">
      <h3>
        Sort by :
        <button @click="sortHotelRoomsByPrice">Sort Rooms</button>
        <button @click="sortHotelsByPrice">Sort Hotels</button>
      </h3>
    </div>
    <hr />
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
.big-container {
  display: flex;
  justify-content: center;
  #search-bar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: center;
    width: fit-content;
    border: 1px solid black;
    padding: 0 10px 0 10px;
    height: --search-bar-height;
    border-radius: 52px;
    background-color: #45c3d15e;
    .search-bar-item {
      padding: 10px;
    }
    .search-button {
      display: inline-block;
      outline: 1px solid var(--component-border-color);
      border: none;
      border-radius: 5px;
      background-color: var(--component-color);
      padding: 20px 18px;
      padding: var(--component-input-inner-padding);
      cursor: pointer;
      &:hover {
        background-color: var(--component-color-hover);
      }
      &:active {
        background-color: var(--component-color-active);
      }
    }
  }
}
#sort-bar {
  width: 80%;
  // height: 80px;
  margin-left: 10px;
  background-color: #2babb9;
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
