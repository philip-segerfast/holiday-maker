import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    hotels: [
      {
        id: 1,
        name: "Hotel 1",
        city: "Barcelona"
      },
      {
        id: 2,
        name: "Hotel 2",
        city: "Berlin"
      },
      {
        id: 3,
        name: "Hotel 3",
        city: "Zagreb"
      },
    ],
  },
  mutations: {
    setHotel(state, payload){
    state.hotels = payload;
    },
  },
  actions: {
    //Använder Axios för tillfället!

    async fetchHotel(){
      await axios.get("http://localhost:3000/rest/hotels")
      .then(response => {
        this.commit("setHotel", response.data)
        console.log(response.data)
      })
    },
  },

    getters: {
      getHotel(state){
        return state.hotels
      },
    }

});
