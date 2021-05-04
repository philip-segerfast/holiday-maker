import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    hotels: [],
    searchQuery: "",

  },
  mutations: {
    setHotel(state, payload){
    state.hotels = payload;
    },

    //Hur implementeras detta??
    setSearchQuery(state, payload) {
      state.searchQuery = payload;
    },
  },
  actions: {
    //Använder Axios för tillfället!

    async fetchHotel(){
      await axios.get("http://localhost:3000/rest/allhotels")
      .then(response => {
        this.commit("setHotel", response.data)
        console.log(response.data)
      })
    },

    //FÖR SÖKRESULTAT Kolla upp!
    async fetchHotels() {
      console.log('SearchQuery is: '+this.state.searchQuery)
      const url ='http://localhost:3001/rest/programs/' + this.state.searchQuery
      //const url ='http://localhost:3000/rest/programs/favorites'
      await axios.get(url)
      .then(response => {
       this.commit("setHotels", response.data) 
      })
    },
  },

    getters: {
      getHotel(state){
        return state.hotels
      },

      //SÖKRESULTAT KOLLA UPP!
      getHotels(state){
        return state.hotels
      },
    }

});
