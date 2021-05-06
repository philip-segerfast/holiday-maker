import axios from "axios";
import { createStore } from "vuex";


export default createStore({
  state: {
    hotels: [],
    hotelSearch: {
      name: null,
    },
    hotelRooms:[],
    hotel:{},
    hotelId:1
  },
  mutations: {
    setAllHotels(state, payload){
    state.hotels = payload;
    },
    setHotelRooms(state,payload){
      state.hotelRooms=payload;
    },
    setHotelSearch(state, payload){
      state.hotelSearch = payload;
    },
  },
  actions: {
  // actions får tillgång till context objektet
   async fetchAllHotels(context) {
    let response = await fetch("/rest/hotels/all-hotels");
    let json = await response.json();
    console.log("Response:");
    console.log(json);
    context.commit("setAllHotels", json)
    },

    async fetchHotelRoomsByHotel(){
      console.log("hotel id: "+ this.state.hotelId)
      const url="/rest/hotels/get-rooms/"+this.state.hotelId
      await axios.get(url)
      .then(response => {
        this.commit("setHotelRooms", response.data)
    })
  },
    async fetchHotelSearch() {
      let response = await fetch('/rest/hotels/search'+ this.state.hotelSearch, {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.hotelSearch)
  })
      console.log('Response from search: '+ response)
  },
  },
          /*let hotelR = await fetch(url)
    hotelR = await hotelR.json()
    this.commit("setHotelRooms", hotelR)*/
    getters: {
      getAllHotels(state){
        return state.hotels
      },
    getHotelRooms(state){
      return state.hotelRooms
    },
      getHotelSearch(state){
        return state.hotelSearch
      },
    }
});
