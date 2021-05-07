/* Ignorera alla errors /Philip */
/* eslint-disable */

import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    hotels: [],
    HotelSearch: {},
    hotelRooms:[],
    hotel:{},
    hotelId:1,
    searchHotelFilter: {
      searchText: "",
      checkInDates: {
        startDate: "",
        endDate: ""
      },
      peopleAmount: {
        adultsAmount: 0,
        childrenAmount: 0
      }
    }
  },
  mutations: {
    setAllHotels(state, payload) {
      state.hotels = payload;
    },
    setHotelRooms(state,payload){
      state.hotelRooms=payload;
    },
    updateSearchText (state, searchText) {
      state.searchHotelFilter.searchText = searchText;
    },
    updateStartDate (state, startDate) {
      state.searchHotelFilter.checkInDates.startDate = startDate;
    },
    updateEndDate (state, endDate) {
      state.searchHotelFilter.checkInDates.endDate = endDate;
    },
    updateChildrenAmount (state, childrenAmount) {
      state.searchHotelFilter.peopleAmount.childrenAmount = childrenAmount;
    },
    updateAdultsAmount (state, adultsAmount) {
      state.searchHotelFilter.peopleAmount.adultsAmount = adultsAmount;
    }
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
    async fetchHotelRoomsByHotel() {
      console.log("hotel id: "+ this.state.hotelId)
      const url="/rest/hotels/get-rooms/"+this.state.hotelId
      await axios.get(url)
      .then(response => {
        this.commit("setHotelRooms", response.data)
      })
    },
  },
  /*let hotelR = await fetch(url)
  hotelR = await hotelR.json()
  this.commit("setHotelRooms", hotelR)*/
  getters: {
    getAllHotels(state){
      return state.hotels;
    },
    getHotelRooms(state){
      return state.hotelRooms;
    },
    getHotelSearch(state){
      return state.hotels;
    },
    getSearchHotelFilter(state) {
      return state.searchHotelFilter;
    }
  },
});
