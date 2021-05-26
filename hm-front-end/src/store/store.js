import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    hotels: [],
    HotelSearch: {},
    hotelRooms: [],
    addedHotelRooms: [],
    hotelToBook: {},
    hotelImages: [],
    hotel: {},
    hotelId: 1,
    totalCost: 0,
    tempHotelName: String,
    searchHotelFilter: {
      searchText: "",
      checkInDates: {
        startDate: "",
        endDate: "",
      },
      AmountOfExtraBeds: 0,
      peopleAmount: {
        adultsAmount: 0,
        childrenAmount: 0,
      },
    },
    hotelById: {}, // Använd this.$route.params.programId istället  -Kan behöva förklaras
    filteredHotels: [],
    sortedHotels: [],
    sortedRooms: [],
    ascending: true,
    loggedInUser: null,
    userBookings: [],
    paymentCards: [
      {
        name: "Visa",
        bank: "Nordea",
      },
    ],
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

      // Sorterar hotels[]
      state.hotels.sort((a, b) => {
        if (a.city < b.city) {
          // om a.city är mindre än b.city --> Ta ett steg tillbaks i arrayen (-1)
          return -1;

          // Ta ett steg fram i arrayen (+1)
        }
        if (a.city > b.city) {
          return 1;
        }
        return 0;
      });
    },

    setSortedHotels() {
      let sortedByPrice;
      sortedByPrice = this.state.hotels.sort((price1, price2) => {
        if (price1.minRoomPrice < price2.minRoomPrice) {
          return -1;
        }
        if (price1.minRoomPrice > price2.minRoomPrice) {
          return 1;
        }
        return 0;
      });
    },

    // Sorterar alla hotelrum utifrån lägst --> högst
    setHotelRooms(state, payload) {
      state.hotelRooms = payload;
    },
    setSortedRooms() {
      let sortedByPrice;
      sortedByPrice = this.state.hotelRooms.sort((price1, price2) => {
        if (price1.baseNightPrice < price2.baseNightPrice) {
          return -1;
        }
        if (price1.baseNightPrice > price2.baseNightPrice) {
          return 1;
        }
        return 0;
      });

      this.state.sortedRooms = sortedByPrice;
      return sortedByPrice;
    },
    setaddedHotelRooms(state, payload) {
      state.addedHotelRooms = payload;
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
    addRoomToBooking(state, room) {
      state.addedHotelRooms.push(room);
    },
    setHotelToBook(state, payload) {
      state.hotelToBook = payload;
    },
    updateTotalCost(state, payload) {
      state.totalCost = this.state.totalCost + payload;
    },
    setFilteredHotels() {
      const allHotels = this.state.hotels;
      // .call används för att bestämma vad "this" ska referera till när man använder det i den följande metoden.
      // Annars refererar det till webbläsarfönstret, vilket inte är önskvärt.
      // Detta för att bland annat kunna referera till this.state.
      let filteredHotels = filterHotelsByCity.call(this, allHotels);
      filteredHotels = filterHotelsByAmountOfPeople.call(this, filteredHotels);
      // filteredHotels = filterHotelsByCheckin.call(this, filteredHotels); // funkar ej än.

      // Hämta ut de filtrerade hotelen utifrån sökning
      this.state.filteredHotels = filteredHotels;
      console.log(this.state.filteredHotels);

      function filterHotelsByCity(listToFilter) {
        let searchPhraseLower = this.state.searchHotelFilter.searchText.toLowerCase();

        if (searchPhraseLower != "") {
          console.log("Filtering on search-phrase: ", searchPhraseLower);

          let filteredOutput = listToFilter.filter((hotel) => {
            let hotelCityLower = hotel.city.toLowerCase();
            return hotelCityLower.includes(searchPhraseLower);
          });
          return filteredOutput;
        } else {
          console.log("No search phrase to filter on.");
          return listToFilter;
        }
      }

      function filterHotelsByCheckin(listToFilter) {
        const filter = this.state.searchHotelFilter;
        // eslint-disable-next-line
        const filterStartDate = filter.checkInDates.startDate;
        // eslint-disable-next-line
        const filterEndDate = filter.checkInDates.endDate;

        if (!filterStartDate || !filterEndDate) {
          console.log("You need to specify a start and end date.");
          return listToFilter;
        }

        console.log("START DATE", filterStartDate);
        console.log("END DATE", filterEndDate);

        // eslint-disable-next-line
        const filteredOutput = listToFilter.filter((hotel) => {
          const hotelRooms = hotel.hotelRooms;
          // eslint-disable-next-line
          const filteredRooms = hotelRooms.filter((room) => {
            const bookings = room.bookings;
            if (bookings.length > 0) {
              // Loopar igenom bokningarna med en vanlig for-loop för for-each-loop
              // funkar inte av någon konstig anledning...
              for (let i = 0; i < bookings.length; i++) {
                let booking = bookings[i];

                const bookingStartDate = booking.fromTime;
                const bookingEndDate = booking.toTime;

                console.log("bookingStartDate", bookingStartDate);
                console.log("bookingEndDate", bookingEndDate);

                /*
                1. Om bokingens slutdatum är innan filtreringens slutdatum
                2. OCH bokningens startdatum är efter filtreringens startdatum
                */

                if (bookingStartDate >= filterStartDate && bookingEndDate >= filterEndDate) {
                  // Collision?
                  console.log("Booking found withing searched period.");
                  console.log("filterStartDate: ", filterStartDate);
                  console.log("filterEndDate: ", filterEndDate);
                  console.log("bookingStartDate: ", bookingStartDate);
                  console.log("bookingEndDate: ", bookingEndDate);
                  return false;
                } else {
                  return true;
                }
              }

              for (let booking in bookings) {
              }
            }
          });
        });
      }

      function filterHotelsByAmountOfPeople(listToFilter) {
        const statePeopleAmount = this.state.searchHotelFilter.peopleAmount;
        const adultsAmount = parseInt(statePeopleAmount.adultsAmount);
        const childrenAmount = parseInt(statePeopleAmount.childrenAmount);
        const totalAmountOfPeople = adultsAmount + childrenAmount;

        if (adultsAmount <= 0) {
          console.log("No adults specified. You need to have at least one adult on the booking.");
          return listToFilter;
        }

        const qualifiedHotels = listToFilter.filter((hotel) => {
          // Hämta ut alla hotell som har rum som tillåter lika många personer som i peopleAmount
          const hotelRooms = hotel.hotelRooms;

          const qualifiedRooms = hotelRooms.filter((room) => {
            const singleBedsAmount = room.singleBedsAmount;
            const doubleBedsAmount = room.doubleBedsAmount;
            const extraBeds = room.maxAmountOfExtraBeds;
            const totalAmountOfSpaces = singleBedsAmount + doubleBedsAmount * 2 + extraBeds;

            if (totalAmountOfSpaces >= totalAmountOfPeople) {
              return true;
            } else {
              return false;
            }
          });

          if (qualifiedRooms.length > 0) {
            return true;
          } else {
            return false;
          }
        });

        return qualifiedHotels;
      }
    },

    setLoggedInUser(state, user) {
      state.loggedInUser = user;
    },
    setAllHotelsInFilteredHotels(state, payload) {
      state.filteredHotels = payload;
    },
    setUserBookings(state, payload) {
      state.userBookings = payload;
    },
    setPaymentCards(state, payload) {
      state.paymentCards = payload;
    },
  },
  actions: {
    // actions får tillgång till context objektet
    async fetchHotelById() {
      console.log("Fetch programById running");
      const url = "/rest/hotels/id/" + this.state.hotelId;
      await axios.get(url).then((response) => this.commit("setHotelById", response.data));
    },
    // actions får tillgång till context objektet
    async fetchAllHotels(context) {
      // fetch alla hotel från backend och lägg i response-variabeln
      let response = await fetch("/rest/hotels/all-hotels");
      // gör om response till json objekt
      let json = await response.json();

      //console.log("Response:");
      // console.log(json);

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
        // If no user is logged it sets LoggedInUser to null instead of empty object.
        if (!response.data) {
          this.commit("setLoggedInUser", null);
        } else {
          this.commit("setLoggedInUser", response.data);
        }
      });
    },
    async fetchUserBookings(context) {
      let response = await fetch("/rest/bookings/userbookings");
      let json = await response.json();
      console.log("Running fetchUserBookings. List of user bookings: ");
      console.log(json);
      context.commit("setUserBookings", json);
    },
    async fetchDeleteBooking({ context }, payload) {
      const url = "/rest/bookings/" + payload.id;
      let response = await fetch(url, {
        method: "DELETE",
      });
      await response.text();
      alert("Booking cancelled");
    },
  },
  getters: {
    getAllHotels(state) {
      return state.hotels;
    },
    getHotelRooms(state) {
      return state.hotelRooms;
    },
    getAddedHotelRooms(state) {
      return state.addedHotelRooms;
    },
    getHotelToBook(state) {
      return state.hotelToBook;
    },
    getSortedHotels(state) {
      return state.sortedHotels;
    },
    getSortedRooms(state) {
      return state.sortedRooms;
    },
    getSortedHotels(state) {
      return state.sortedHotels;
    },
    getTotalCost(state) {
      return state.totalCost;
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
    getAdultAmount(state) {
      return state.searchHotelFilter.peopleAmount.adultsAmount;
    },
    getStartDate(state) {
      return state.searchHotelFilter.checkInDates.startDate;
    },
    getEndDate(state) {
      return state.searchHotelFilter.checkInDates.endDate;
    },
  },
});
