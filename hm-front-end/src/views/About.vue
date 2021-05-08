<template>
  <div class="about">
    <h1>This is an about page</h1>

     <h2>{{searchResult}}</h2>

  </div>
</template>


<script>
  
  // Skapar Array(testData) och lägger till 3 objekt
    let testData = [
        {
          city: "Malmö",
          searchText: "Hyacintgatan",
          startDate: "",
          endDate: "",
          amountOfAdults: 0,
          amountOfChildren: 0
        },
        {
          city: "Malmö",
          searchText: "Påskliljegatan",
          startDate: "",
          endDate: "",
          amountOfAdults: 0,
          amountOfChildren: 0
        },
        {
          city: "Copenhagen",
          searchText: "",
          startDate: "10-02-21",
          endDate: "14-02-21",
          amountOfAdults: 0,
          amountOfChildren: 0
        },
      ];

      // Skapa variabel(searchResult) och tillsätt logik: 
      // Använd array.filter metoden med array(testData)
      // Skapa en "filtreringsvariabel"(hotelEx) => hotelEx.
      // hotelEx går in i Arrayen och jämför searchResult med city i objekten.
      // Resultat: Renderar ut Copenhagen från arrayen.
      let searchResult = "Malmö"
      console.log(testData.filter(hotelEx => {return hotelEx.city === searchResult}));
         
    </script>

<style>

</style>