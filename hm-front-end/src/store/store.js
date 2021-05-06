import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    hotels: [],
    HotelSearch: {},

  },
  mutations: {
    setAllHotels(state, payload){
    state.hotels = payload;
    },

    //Hur implementeras detta??
    setHotelSearch(state, payload) {
      state.HotelSearch = payload;
    },
  },
  actions: {
    //Använder Axios för tillfället!

    async fetchAllHotels(){
      await axios.get("http://localhost:3000/rest/all-hotels")
      .then(response => {
        this.commit("setAllHotels", response.data)
        console.log("TESTING") 
        console.log(response.data)
      })
    },

    // FÖR SÖKRESULTAT Kolla upp!
    // Axios eller ???
    // Kommer att söka på fler än en Entitet
    
    async fetchHotelSearch() {

    // Credentials - Ett objekt som kommer att innehålla en massa sökval 
   //   let hotels = {
   //       email: this.email,
   //       password: this.password,
   //       name: this.name
   //   }

  },


  },

    getters: {
      getAllHotels(state){
        return state.hotels
      },

      //SÖKRESULTAT KOLLA UPP!
      getHotelSearch(state){
        return state.HotelSearch
      },
    }

});
