import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    hotels: [],
    HotelSearch: {},
    hotelRooms: [],
    hotel: {},
    hotelId: 1,
    tempHotelName: String,
    searchHotelFilter: {
      searchText: "",
      checkInDates: {
        startDate: "",
        endDate: "",
      },
      peopleAmount: {
        adultsAmount: 0,
        childrenAmount: 0,
      },
    },
    hotelById: {}, // Använd this.$route.params.programId istället
    filteredHotels: [],
  },
  mutations: {
    setHotelById(state, payload) {
      state.hotelById = payload;
    },
    setHotelId(state, payload) {
      state.hotelId = payload;
    },
    setAllHotels(state, payload) {
      state.hotels = payload;
    },
    setHotelRooms(state, payload) {
      state.hotelRooms = payload;
    },
    setTempHotelName(state, payload){
      state.tempHotelName = payload;
    },
    updateSearchText(state, searchText) {
      state.searchHotelFilter.searchText = searchText;
    },
    updateStartDate(state, startDate) {
      state.searchHotelFilter.checkInDates.startDate = startDate;
    },
    updateEndDate(state, endDate) {
      state.searchHotelFilter.checkInDates.endDate = endDate;
    },
    updateChildrenAmount(state, childrenAmount) {
      state.searchHotelFilter.peopleAmount.childrenAmount = childrenAmount;
    },
    updateAdultsAmount(state, adultsAmount) {
      state.searchHotelFilter.peopleAmount.adultsAmount = adultsAmount;
    },
    setFilteredHotels(){
      // Creates local variable to temporary hold filtered hotels
      let myHotels;
      
      // If searchquery is empty it will not activate filtering
      if(this.state.searchHotelFilter.searchText) {   

        // Filtering loop, each hotel in list is called hotelObject
        myHotels = this.state.hotels.filter((hotelObject) => {  
          
          // Changes hotels city name to lower case
          hotelObject.city = hotelObject.city.toLowerCase()     
          
          // returns list of hotels that have city name like the searchquery
          return hotelObject.city.includes(this.state.searchHotelFilter.searchText.toLowerCase()) 
        })

        // Puts list of filtered hotel in a list in state
        this.state.filteredHotels = myHotels

        //If searchquery is empty it puts list of all hotels into filteredHotels list
      } else {
        this.state.filteredHotels = this.state.hotels
      }
      console.log(this.state.filteredHotels) // Debug
    }
  },
  actions: {
    // actions får tillgång till context objektet
       
    async fetchHotelById() {
      console.log("Fetch programById running")
      const url = "/rest/hotels/id/" + this.state.hotelId
      await axios.get(url)
      .then(response =>(
        this.commit("setHotelById", response.data)
      ))
    },
    async fetchAllHotels(context) {
      let response = await fetch("/rest/hotels/all-hotels");
      let json = await response.json();
      console.log("Response:");
      console.log(json);
      context.commit("setAllHotels", json);
    },
    async fetchHotelRoomsByHotel() {
      console.log("hotel id: " + this.state.hotelId);
      const url = "/rest/hotels/get-rooms/" + this.state.hotelId;
      await axios.get(url).then((response) => {
        this.commit("setHotelRooms", response.data);
      });
    },
  },
  getters: {
    getAllHotels(state) {
      return state.hotels;
    },
    getHotelRooms(state) {
      return state.hotelRooms;
    },
    getHotelById(state) {
      return state.hotelById;
    },
    getHotelSearch(state) {
      return state.hotels;
    },
    getSearchHotelFilter(state) {
      return state.searchHotelFilter;
    },
  },
});
