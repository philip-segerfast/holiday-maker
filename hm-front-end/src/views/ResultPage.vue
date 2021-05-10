<template>
  <div class="result-page">
    <div>
      <SearchBar/>
    </div>
      <!-- Insert hotels in hotelsList (Nestlar componenten HotelCard i ResultPage)-->
      <!-- Loopar ut (v-for) listan av kategorier enskilt = Skapar varje "category" som en egen komponent-->  
    <div v-if="filteredHotels.length > 0">
      <HotelCard 
        v-for="(hotel, i) in filteredHotels"
        :key="hotel + i"
        :hotel="hotel"
      /> 
    </div>
   </div>
   <button @click="filterHotels">Filter</button>
</template>

<script>
// Import HotelCard to use in ResultPage
import HotelCard from "../components/HotelCard.vue";
import SearchBar from "../components/SearchBar.vue"


export default {
  data(){
    return{
      morehotels: [],
      searchtext: "",

    }
  },
 
 // declare HotelCard from import
  components: {
    HotelCard,
    SearchBar,
  },

  methods: {
   filteredSearch(){
     let filteredSearch = this.hotels

     if(this.searchtext != "" && this.searchtext){
       filteredSearch = filteredSearch.filter((hotel) => {
       return hotel.name;
     })

     }

     return filteredSearch;
      
      },
      filterHotels() {
        this.$store.commit("setFilteredHotels")

      }
  },

 
  computed: {
  // Hämtar hotellistan från store
    hotels() {
      return this.$store.getters.getAllHotels
    },    
     filteredHotels() {
      return this.$store.state.filteredHotels
    },
    },
  

  // Aktiverar kopplingen till backend 
  mounted() {
    
        this.$store.dispatch("fetchAllHotels");
    }
};
</script>

<style>

</style>
