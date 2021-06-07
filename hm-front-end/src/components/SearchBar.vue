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
    beachDistance() {
      return this.$store.getters.getBeachDistance;
    },
    centrumDistance() {
      return this.$store.getters.getCentrumDistance;
    },
  },
  methods: {
    filterHotels() {
      // Sök efter hotel i searchfältet (filtrerar hotelen) click--> push till result-page
      //this.$store.dispatch("fetchAllHotels")
      this.$store.dispatch("setFilteredHotels");
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
    box-shadow: var(--box-shadow-navbar-outline-border);
    padding: 0 10px 0 10px;
    height: --search-bar-height;
    border-radius: 52px;
    background-color: #45c3d15e;
    .search-bar-item {
      padding: 10px;
    }
    .search-button {
      display: inline-block;
      border: none;
      border-radius: 5px;
      background-color: var(--component-color);
      padding: 20px 18px;
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
  #sort-bar {
    width: fit-content;
    height: 40px;
    // height: 80px;
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
    align-self: center;

    .sort-button {
      box-shadow: var(--box-shadow-outline-border);
      margin-right: 10px;
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
