import axios from "axios";
import { createStore } from "vuex";
import axios from "axios";


export default createStore({
  state: {
    hotels: [],
    HotelSearch: {},
    hotelRooms:[],
    hotel:{}
  },
  mutations: {
    setAllHotels(state, payload){
    state.hotels = payload;
    },
    setHotelRooms(state,payload){
      state.hotelRooms=payload;
    },
  },
  actions: {
    async fetchAllHotels(){
      await axios.get("http://localhost:3000/rest/allhotels")
      .then(response => {
        this.commit("setAllHotels", response.data)
        console.log(response.data)
      })
    },
    async fetchHotelRoomsByHotel(){
      console.log("hotel id: "+ this.state.hotelId)
    const url="/rest/get-rooms-for-hotel/"+this.state.hotelId
    await axios.get(url)
    .then(response => {
      this.commit("setHotelRooms", response.data)
    })
    async fetchHotelSearch() {
      let response = await fetch('/rest/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.searchQuery)
  })
      console.log('Response from search: '+ response)
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
    }
      getHotelSearch(state){
        return state.hotels
      },
    }
});
