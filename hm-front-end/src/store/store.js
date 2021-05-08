import axios from "axios";
import { createStore } from "vuex";


export default createStore({
  state: {
    hotels: [],
    seacrhHotelFilter: {
      searchText: "",
      city: "",
      checkInDates: {
        startDate: "",
        endDate: ""
      },
      peopleAmount: {
        adultsAmount: 0,
        childrenAmount: 0
      }
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
    setSearchHotelFilter(state, payload){
      state.searchHotelFilter = payload;

    // let hotelSearch = hotels.filter(
    //   (hotel) =>hotel.name === "Newton Hotel" 
   //  );
    // console.log(hotelSearch);


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
    async fetchSearchHotelFilter(context) {
      let response = await fetch("/rest/hotels/all-hotels"+this.state.searchHotelFilter, {
      method: 'GET',
      headers: {'Content-Type': 'application/json' },
      mode: 'cors',
      cache: 'default'
    })
    let json = await response.json
    context.commit("setSearchHotelFilter", json)

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
      getSearchHotelFilter(state){
        return state.searchHotelFilter
      },
    }
});
