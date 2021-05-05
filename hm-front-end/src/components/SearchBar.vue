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
            searchtext: ""
        }
    },

    //Kolla upp "fetchHotels"
    methods: {
        searchMethod() {
            let searchtext = this.searchtext
            console.log("searchtext is: "+searchtext);
            this.$store.commit("setHotelSearch", searchtext)
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