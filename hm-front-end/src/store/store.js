import { createStore } from "vuex";
import axios from "axios";


export default createStore({
  state: {
    hotelId:2,
    hotelRooms:[],
    hotel:{}
  },


  mutations: {

    setHotelRooms(state,payload){
      state.hotelRooms=payload;
    },


  },
  actions: {

    async fetchHotelRoomsByHotel(){
      console.log("hotel id: "+ this.state.hotelId)
    const url="/rest/get-rooms-for-hotel/"+this.state.hotelId

    await axios.get(url)
    .then(response => {
      this.commit("setHotelRooms", response.data)
    })

    /*let hotelR = await fetch(url)
    hotelR = await hotelR.json()
    this.commit("setHotelRooms", hotelR)*/

  },



  },

  getters:{
    getHotelRooms(state){
      return state.hotelRooms
    }
  },

  modules: {},
});
