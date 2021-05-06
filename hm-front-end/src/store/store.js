import axios from "axios";
import { createStore } from "vuex";


export default createStore({
  state: {
    hotels: [],
    HotelSearch: {},
    hotelRooms:[],
    hotel:{},
    hotelId: {},
    hotelById:{},
  },
  mutations: {

    setHotelById(state, payload){
      state.hotelById=payload;
    },

    setAllHotels(state, payload){
    state.hotels = payload;
    },
    setHotelRooms(state,payload){
      state.hotelRooms=payload;
    },
  },
  actions: {
    
    async fetchHotelById() {
      console.log("Fetch programById running")
      const url = "/rest/hotels/id/{id}"+this.state.hotelId
      await axios.get(url)
      .then(response =>(
        this.commit("setHotelById", response.data)
      ))
    },

    async fetchAllHotels(){
      await axios.get("/rest/all-hotels")
      .then(response => {
        this.commit("setAllHotels", response.data)
        console.log(response.data)
      })
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
      let response = await fetch('/rest/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.searchQuery)
  })
      console.log('Response from search: '+ response)
  },
  },
          /*let hotelR = await fetch(url)
    hotelR = await hotelR.json()
    this.commit("setHotelRooms", hotelR)*/
    getters: {
      getHotelById(state){
        return state.hotelById
      },

      getAllHotels(state){
        return state.hotels
      },
    getHotelRooms(state){
      return state.hotelRooms
    },
      getHotelSearch(state){
        return state.hotels
      },
    }
});
