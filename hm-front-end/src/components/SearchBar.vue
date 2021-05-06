<template>
  <form @submit.prevent="searchMethod">
<input type="text" id="search" placeholder="type search" v-model="searchText">
<button type="submit">Search</button>
</form>
    
</template>

<script>

export default {
    data() {
        return {
            searchText: ""
        }
    },

    //Kolla upp "fetchHotels"
    methods: {
        searchMethod() {
            let searchText = this.searchText
            console.log("searchtext is: "+searchText);
            this.$store.commit("setHotelSearch", searchText)
            this.$store.dispatch("fetchHotelSearch");
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