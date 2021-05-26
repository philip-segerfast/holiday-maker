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
    box-shadow: var(--box-shadow-outline-border);
    padding: 0 10px 0 10px;
    height: --search-bar-height;
    border-radius: 52px;
    background-color: #00ffff;
    .search-bar-item {
      padding: 10px;
    }
    .search-button {
      display: inline-block;
      border: none;
      border-radius: 2px;
      background-color: rgb(67, 88, 206);
      color: white;
      padding: var(--component-input-inner-padding);
      cursor: pointer;
      box-shadow: var(--box-shadow-outline-border);
      &:hover {
        background-color: rgb(57, 78, 195);
        box-shadow: var(--box-shadow-outline-smooth);
      }
      &:active {
        background-color: rgb(48, 69, 187);
      }
    }
  }
}
</style>
