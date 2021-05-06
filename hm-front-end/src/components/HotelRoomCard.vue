<template>
<div class="hotelRoom-card">
<h2>Room:{{hotelRoom.name}}</h2>
<h2>Sixe:{{hotelRoom.size}} m^2</h2>
<h2>Price:{{hotelRoom.baseNightPrice}}</h2>
<h2>Number of single beds:{{hotelRoom.singleBedsAmount}}</h2>
<h2>Number of double beds:{{hotelRoom.doubleBedsAmount}}</h2>
<h2>Number of extra beds allowed:{{hotelRoom.maxAmountOfExtraBeds}}</h2>


<button>Add room</button>

 </div>
  
</template>

<script>
export default {
 

props:["hotelRoom"],


  computed:{
  
  },

}


</script>

<style>
.hotelRoom-card {
  background-color: lightgray;
  margin-bottom: 20px;
  padding: 10px;
  font-family: 'Arial';
  border-radius: 30px;
  border: 5px solid whitesmoke;
  width: 100%;
  
  }
  

</style>