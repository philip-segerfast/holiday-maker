<template>
  <form @submit.prevent="searchMethod">
<input type="text" id="search" placeholder="type search" v-model="searchtext">
<button type="submit">Search</button>
</form>
</template>

<script>
//FÖR SÖKRESULTAT
import HotelCard from "../components/HotelCard.vue";

export default {
    data() {
        return {
            searchtext: ""
        }
    },

    //Kolla upp "fetchHotels"
    methods: {
        searchMethod() {
            let searchtext = this.searchtext
            console.log("searchtext is: "+searchtext);
            this.$store.commit("setSearchQuery", searchtext)
            this.$store.dispatch("fetchHotels");
        }
    },

    components: {
        HotelCard,
    },

    computed: {
        hotels(){
            return this.$store.getters.getHotel
        },

    },
    mounted() {
        this.$store.dispatch("fetchHotel")
    }

};
</script>

<style>

</style>