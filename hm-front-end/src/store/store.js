import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    hotels: [],
  },
  mutations: {
    setHotel(state, payload){
    state.hotels = payload;
    },
  },
  actions: {
    //Osäker om denna är relevant

    async fetchHotel(){
      await axios.get("http://localhost:3000/rest/hotels")
      .then(response => {
        this.commit("setHotel", response.data)
        console.log(response.data)
      })
    },

    getters: {
      getHotel(state){
        return state.hotels
      },
    }

  },
  modules: {},
});
