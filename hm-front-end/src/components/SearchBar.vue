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
             props: ["seacrhHotelFilter"],
            
        }
    },

    //Kolla upp "fetchHotels"
    methods: {
        searchMethod() {
            let searchResult = this.searchResult
            console.log("searchtext is: "+searchResult);
            this.$store.commit("setSearchHotelFilter", searchResult)
            this.$store.dispatch("fetchSearchHotelFilter");
        }
    },

    components: {
        
    },

    computed: {
        hotels(){
            return this.$store.getters.searchResult
        },

    },

    

};
</script>

<style>

</style>