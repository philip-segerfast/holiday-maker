<template>
<h1>Categories</h1>

  <div class="search-result">

      <!-- Insert hotels in hotelsList (Nestlar componenten HotelCard i ResultPage)  (User story 4)-->
      <!-- Loopar ut (v-for) listan av kategorier enskilt = Skapar varje "category" som en egen komponent (User story 4)-->  
    <div v-if="hotels.length > 0">
      <HotelCard 
        v-for="(hotel, i) in hotels"
        :key="hotel + i"
        :hotel="hotel"
      /> 
    </div>
   </div>
</template>

<script>

// Import HotelCard to use in ResultPage (User story 4)
import HotelCard from "../components/HotelCard.vue";

export default {
 
 // declare HotelCard from import (User story 4)
  components: {
    HotelCard,
  },

 
  computed: {
  // Hämtar hotellistan från store (User story 4)
    hotels() {
            return this.$store.getters.getHotel
        },
    
  },

  // Aktiverar kopplingen till backend (User story 4)
  mounted() {
        this.$store.dispatch("fetchHotel");
    }
};
</script>

<style>

</style>
