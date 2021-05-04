<template>

<!-- Implementera click funktion när HotelPage är klar @click="redirectToHotelPage" -->
    <div class="hotel-card">         
            <span>{{ hotel.name }}</span>
            -
            <span>{{ hotel.city }}</span>       
    </div>
</template>

<script>
export default {

    props: ["hotel"],

    /* Inväntar HotelPage
    methods: {
        redirectToHotelPage() {
            this.$store.commit("setTempHotelName", this.hotel.name)
            let routerUrl = '/hotel-card/' + this.hotel.id
            this.$router.push({path: routerUrl})

        }
    }
    */
}
</script>

<style>

.hotel-card {
  background-color: lightgray;
  margin-bottom: 20px;
  padding: 10px;
  font-family: 'Arial';
  border-radius: 30px;
  border: 5px solid whitesmoke;
  }

</style>
