import axios from "axios";
//import { clearConfigCache } from "prettier";
import { createStore } from "vuex";


export default createStore({
  state: {
    hotels: [],
    searchHotelFilter: {
      searchText: "hotel",
      city: "B",
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
    hotelId:1,
    filteredHotels: [],
  },

  mutations: {
    setAllHotels(state, payload){
    state.hotels = payload;
    },
    setHotelRooms(state,payload){
      state.hotelRooms=payload;
    },
    setSearchHotelFilter(state, payload){
      state.searchHotelFilter.city = payload;

    // let hotelSearch = hotels.filter(
    //   (hotel) =>hotel.name === "Newton Hotel" 
   //  );
    // console.log(hotelSearch);

    },
    setFilteredHotels () {
      //this.state.filteredHotels = this.state.hotels
      //let searchValue = ""
      let myHotels;
     
      if(this.state.searchHotelFilter.city) {
        myHotels = this.state.hotels.filter((item) => {
          item.city = item.city.toLowerCase()
          return item.city.includes(this.state.searchHotelFilter.city.toLowerCase())
        })
      }

      this.state.filteredHotels = myHotels

      /*
      if (searchValue != '' && searchValue) {
        myHotels = myHotels.filter((item) => {
          return item.name
            .toUpperCase()
            .includes(searchValue.toUpperCase())
        })
      }
      this.state.filteredHotels = myHotels
      */
      console.log("Filtered hotels: " + this.state.filteredHotels)
    }
  },

  actions: {
  // actions får tillgång till context objektet
   async fetchAllHotels() {
    console.log('Search is '+this.state.seacrhHotelFilter)
    let response = await fetch("/rest/hotels/all-hotels" );
    let json = await response.json();
    console.log(json);
    this.commit("setAllHotels", json)
    },

    async fetchHotelRoomsByHotel(){
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
        return state.hotels
      },
      getHotelRooms(state){
      return state.hotelRooms
      },
      getFilteredHotels(state){
        return state.filteredHotels
      },
    
    }
});
