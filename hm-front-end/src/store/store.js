import { createStore } from "vuex";

export default createStore({
  state: {
    hotels: [],
    HotelSearch: {},
  },
  mutations: {
    setAllHotels(state, payload) {
      state.hotels = payload;
    },

    //Hur implementeras detta??
    setHotelSearch(state, payload) {
      state.HotelSearch = payload;
    },
  },
  actions: {
    async fetchAllHotels() {
      let response = await fetch("/rest/hotels/all-hotels");
      let json = await response.json();
      console.log("Response:");
      console.log(json);
      this.state.hotels = json;
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
    getAllHotels(state) {
      return state.hotels;
    },
  },
});
