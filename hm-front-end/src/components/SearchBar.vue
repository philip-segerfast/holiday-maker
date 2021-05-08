<template>
  <form @submit.prevent="searchMethod">
    <input type="text" id="search" placeholder="type search" v-model="searchtext">
        <button type="submit">Search</button>

   
    </form>
    
</template>

<script>

export default {
    data() {
        return {
            searchText: "",
            
        }
    },

    //Kolla upp "fetchHotels"
    methods: {
        searchMethod() {
            let searchText = this.searchText
            console.log("searchtext is: "+searchText);
            this.$store.commit("setSearchHotelFilter", searchText)
            this.$store.dispatch("fetchSearchHotelFilter");
        }
    },

    components: {
        
    },

    computed: {
        hotels(){
            return this.$store.getters.getHotelSearch
        },

    },

    // mounted() {
    //    this.$store.dispatch("fetchHotel")
    // }

};
</script>

<style>

</style>