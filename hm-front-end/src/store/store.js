import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    
    hotels: [],
    HotelSearch: {},
    hotelRooms: [],
    hotelImages: [],
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
      loggedInUser:null,
      

    },
    hotelById: {}, // Använd this.$route.params.programId istället
    filteredHotels: [],
    loggedInUser: { //Hårdkodad inloggad användera tills vi har en login-funktion för att se om logout fungerar
      email: "Bob@gmail.com"
    }

  },
  // "Setters"
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
      // Skapa en myHotels variabel utan att tillge ett värde.
      let myHotels;
      
      // Hämta ut searchText ifrån objektet searchHotelFilter ur state
      if(this.state.searchHotelFilter.searchText) {
      // Filtrera hotelen inuti hotels[] i state samt skapar filtervariabel(item). Lagra resultat i myHotels.
        myHotels = this.state.hotels.filter((item) => {
      // "peka på city" med den skapade filtreringsvariabeln (item.city (små bokstäver))
          item.city = item.city.toLowerCase()
      // Returnera filtrerings variabeln som matchar sökningsresultatet från state.    
          return item.city.includes(this.state.searchHotelFilter.searchText.toLowerCase())
        })
        // Hämta ut de filtrerade hotelen utifrån sökning
        this.state.filteredHotels = myHotels
      } else {
        // Om inget skrivs i sökningsfältet och en trycker på button
        // Lista ut alla hotel från hotels[] ifrån state 
        this.state.filteredHotels = this.state.hotels
      }
      console.log(this.state.filteredHotels)
      
    },
    

    setLoggedInUser(state, user) {
      state.loggedInUser = user
    },
  },
  actions: {
       
    async fetchHotelById() {
      console.log("Fetch programById running")
      const url = "/rest/hotels/id/" + this.state.hotelId
      await axios.get(url)
      .then(response =>(
        this.commit("setHotelById", response.data)
      ))
    },
    // actions får tillgång till context objektet
    async fetchAllHotels(context) {
    // fetch alla hotel från backend och lägg i response-variabeln  
      let response = await fetch("/rest/hotels/all-hotels");
    // gör om response till json objekt
      let json = await response.json();
      console.log("Response:");
      console.log(json);
    // objektet context gör så att vi kan commita alla hotels, json??
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
