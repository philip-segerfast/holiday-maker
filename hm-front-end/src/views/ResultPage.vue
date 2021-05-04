<template>
  <div class="result-page">

      <!-- Insert hotels in hotelsList (Nestlar componenten HotelCard i ResultPage)-->
      <!-- Loopar ut (v-for) listan av kategorier enskilt = Skapar varje "category" som en egen komponent-->  
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

// Import HotelCard to use in ResultPage
import HotelCard from "../components/HotelCard.vue";

export default {
 
 // declare HotelCard from import
  components: {
    HotelCard,
  },

 
  computed: {
  // Hämtar hotellistan från store
    hotels() {
            return this.$store.state.hotels
        },
    
  },

  // Aktiverar kopplingen till backend 
  mounted() {
      //  this.$store.dispatch("fetchHotel");
    }
};
</script>

<style>

</style>
