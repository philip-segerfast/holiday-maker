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
    },
    hotelById: {}, // Använd this.$route.params.programId istället
    filteredHotels: [],
    loggedInUser: null,
    userBookings: [],
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
    setTempHotelName(state, payload) {
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
    setFilteredHotels() {
      // Skapa en myHotels variabel utan att tillge ett värde.
      let myHotels;
      myHotels = this.state.hotels;
      //let maxNumOfPeople;
      let listOfRooms;

      // Hämta ut searchText ifrån objektet searchHotelFilter ur state
      // Aktiverar filtrering om searchText har ett innehåll
      if (this.state.searchHotelFilter.searchText) {
        console.log("Running searchText filter")
        // Filtrera hotellen inuti hotels[] i state samt skapar filtervariabel(hotelObject). Lagra resultat i myHotels.
        myHotels = this.state.hotels.filter((hotelObject) => {
          // Gör tillfälligt om hotellobjektets stad till små bokstäver
          hotelObject.city = hotelObject.city.toLowerCase();
          // Returnerar en lista av hotell vars namn på stad matchar söktermen.
          return hotelObject.city.includes(
            this.state.searchHotelFilter.searchText.toLowerCase()
          );
        });
        console.log("Searchbox filtered list: " + myHotels.length)
      }
      
      let adultsAmount = this.state.searchHotelFilter.peopleAmount.adultsAmount;
      // Filtrerar baserat på antal vuxna
      if (adultsAmount != 0) {
        console.log("Running amount of Adults filter")
        myHotels = myHotels.filter((hotelObject) => {
          listOfRooms = hotelObject.hotelRooms.filter(roomObject => roomObject.singleBedsAmount >= adultsAmount);
          console.log("Number of rooms: " + listOfRooms.length); 

          //maxNumOfPeople = hotelObject.hotelRooms
          return (listOfRooms.length > 0);
        });
      
        console.log("Adults amount filtered list: " + myHotels.length)
      }
      // Hämta ut de filtrerade hotelen utifrån sökning
      this.state.filteredHotels = myHotels;
      console.log(this.state.filteredHotels);
    },
    setLoggedInUser(state, user) {
      state.loggedInUser = user;
    },
    setAllHotelsInFilteredHotels(state, payload) {
      state.filteredHotels = payload;
    },
  },
  actions: {
    // actions får tillgång till context objektet
    async fetchHotelById() {
      console.log("Fetch programById running");
      const url = "/rest/hotels/id/" + this.state.hotelId;
      await axios
        .get(url)
        .then((response) => this.commit("setHotelById", response.data));
    },
    // actions får tillgång till context objektet
    async fetchAllHotels(context) {
      // fetch alla hotel från backend och lägg i response-variabeln
      let response = await fetch("/rest/hotels/all-hotels");
      // gör om response till json objekt
      let json = await response.json();
      console.log("Running fetchAllHotels. List of all hotels: ");
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
    async fetchLoggedInUser() {
      const url = "/auth/whoami";
      await axios.get(url).then((response) => {
        this.commit("setLoggedInUser", response.data);
      });
    },
  },
  mounted() {
    console.log("Hello");
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
    getLoggedInUser(state) {
      return state.loggedInUser;
    },
  },
});
