<template>
<div class="hotel-card">
<h2>{{hotel.name}}</h2>
<h2>{{hotel.city}}</h2>


</div>
  
</template>

<script>
export default {
props:["hotel"],
computed:{

}
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
  width: 100%;
  
  }
  

</style>