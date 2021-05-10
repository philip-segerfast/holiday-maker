<template>
  <form @submit.prevent="searchMethod">
    <input type="text" id="search" placeholder="type search" v-model="searchResult">
        <button type="submit">Search</button>

   
    </form>
    
</template>

<script>

export default {
    data() {
        return {
             searchResult: '',
            
        }
    },

    //Kolla upp "fetchHotels"
    methods: {
        searchMethod() {
            let searchResult = this.searchResult
            console.log("searchtext is: "+searchResult);
            this.$store.commit("setSearchHotelFilter", searchResult)
            this.$store.dispatch("fetchAllHotels");
            console.log(searchResult);
        }
    },

    components: {
        
    },

    computed: {
        hotels(){
            return this.$store.getters.searchHotelFilter
        },

    },

    

};
</script>

<style>

</style>