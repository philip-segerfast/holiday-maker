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
      people: {
        adultsAmount: 0,
        children: [],
      },
    },
    hotelById: {}, // Använd this.$route.params.programId istället  -Kan behöva förklaras
    filteredHotels: [],
    ascending: true,
    loggedInUser: null,
    userBookingList: [],
    userBooking: {
      id: "",
      hotelRooms: [
        {
          id: "",
          name: "",
          size: "",
          singleBedsAmount: "",
          doubleBedsAmount: "",
          baseNightPrice: "",
          maxAmountOfExtraBeds: "",
        },
      ],
      children: [
        {
          id: "",
          age: "",
        },
      ],
      user: {
        id: "",
        email: "",
        first_name: "",
        last_name: "",
      },
      fromTime: "",
      toTime: "",
      adults: "",
      extraBeds: "",
      luxuryClass: "",
      hotel: {
        id: 1,
        name: "",
        description: "",
        city: "",
        address: "",
        extraBedPrice: "",
        coordinates: "",
        beachDistance: "",
        centerDistance: "",
        allInclusivePrice: "",
        fullBoardPrice: "",
        selfCateringPrice: "",
        halfPensionPrice: "",
        minRoomPrice: "",
        images: [
          {
            id: "",
            fileName: "",
          },
        ],
        hotelTags: [
          {
            id: "",
            label: "",
          },
        ],
      },
      paid: "",
    },
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

    setSortedHotelsAscending() {
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
    setSortedHotelsDescending() {
      let maxHotelPrice;
      maxHotelPrice = this.state.hotels.sort((price1, price2) => {
        if (price1.minRoomPrice < price2.minRoomPrice) {
          return -1;
        }
        if (price1.minRoomPrice > price2.minRoomPrice) {
          return 1;
        }
        return 0;
      });
      return maxHotelPrice.reverse();
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
      return sortedByPrice;
    },
    setSortedRoomsDescending() {
      let maxRoomPrice;
      maxRoomPrice = this.state.hotelRooms.sort((maxPrice1, maxPrice2) => {
        console.log(maxPrice1.baseNightPrice);
        if (maxPrice1.baseNightPrice > maxPrice2.baseNightPrice) {
          return 1;
        }
        if (maxPrice1.baseNightPrice < maxPrice2.baseNightPrice) {
          return -1;
        }
        return 0;
      });
      return maxRoomPrice.reverse();
    },
    setSortedRatings() {
      let sortedByRating;
      let hotels = this.state.hotels;
      console.log("Hotels: ", hotels);
      sortedByRating = hotels.sort((hotel1, hotel2) => {
        console.log(hotel1.averageRating);
        if (hotel1.averageRating < hotel2.averageRating) {
          return -1;
        }
        if (hotel1.averageRating > hotel2.averageRating) {
          return 1;
        }
        return 0;
      });
      console.log("Sorted by rating: ", sortedByRating);
      return sortedByRating;
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
      /* 
        .call används för att bestämma vad "this" ska referera till när man använder det i den följande metoden.
        Annars refererar det till webbläsarfönstret, vilket inte är önskvärt.
        Detta för att bland annat kunna referera till this.state. 
      */
      let filteredHotels = filterHotelsByCity.call(this, allHotels);
      filteredHotels = filterHotelsByAmountOfPeople.call(this, filteredHotels);
      filteredHotels = filterHotelsByCheckin.call(this, filteredHotels);

      // Hämta ut de filtrerade hotelen utifrån sökning
      this.state.filteredHotels = filteredHotels;
      // console.log(this.state.searchHotelFilter); // <-- SHOW FILTER DATA

      function filterHotelsByCity(listToFilter) {
        let searchPhraseLower = this.state.searchHotelFilter.searchText.toLowerCase();

        if (searchPhraseLower != "") {
          // console.log("Filtering on search-phrase: ", searchPhraseLower);
          let filteredOutput = listToFilter.filter((hotel) => {
            let hotelCityLower = hotel.city.toLowerCase();
            return hotelCityLower.includes(searchPhraseLower);
          });
          return filteredOutput;
        } else {
          // console.log("No search phrase to filter on.");
          return listToFilter;
        }
      }

      function filterHotelsByCheckin(listToFilter) {
        const filter = this.state.searchHotelFilter;
        const filterStartDate = filter.checkInDates.startDate;
        const filterEndDate = filter.checkInDates.endDate;

        if (!filterStartDate || !filterEndDate) {
          // console.log("You need to specify a start and end date.");
          return listToFilter;
        }

        const filteredOutput = listToFilter.filter((hotel) => {
          const hotelRooms = hotel.hotelRooms;
          if (hotelRooms.length > 0) {
            // filteredRooms contains all Available rooms
            const filteredRooms = hotelRooms.filter((room) => {
              const bookings = room.bookings;
              if (bookings.length > 0) {
                // Loopar igenom bokningarna med en vanlig for-loop för for-each-loop
                // funkar inte av någon konstig anledning...
                for (let i = 0; i < bookings.length; i++) {
                  let booking = bookings[i];

                  const bookingStartDate = booking.fromTime;
                  const bookingEndDate = booking.toTime;

                  /*
                    Om datumfiltret slutar innan bokningen
                      och
                    Om datumfiltret börjar efter bokningens slutdatum
                    - då är det ledigt.
                  */

                  if (filterEndDate < bookingStartDate || filterStartDate > bookingEndDate) {
                    // Ledigt
                    console.log("No booking found within searched period.");
                    return true;
                  } else {
                    console.log("Booking found within searched period.");
                    return false;
                  }
                }
              } else {
                return true;
              }
            });
            // returnera vilka hotell som har lediga rum...
            if (filteredRooms.length > 0) {
              return true;
            } else {
              return false;
            }
          } else {
            // Hotel didn't have any rooms at all.
            return false;
          }
        });

        return filteredOutput;
      }

      function filterHotelsByAmountOfPeople(listToFilter) {
        const statePeopleAmount = this.state.searchHotelFilter.peopleAmount;
        const adultsAmount = parseInt(statePeopleAmount.adultsAmount);
        const childrenAmount = parseInt(statePeopleAmount.childrenAmount); // BEHÖVER ÄNDRAS SEN!!!
        const totalAmountOfPeople = adultsAmount + childrenAmount;

        if (adultsAmount <= 0) {
          // console.log("No adults specified. You need to have at least one adult on the booking.");
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
    setUserBookingList(state, payload) {
      state.userBookingList = payload;
    },
    setUserBooking(state, payload) {
      state.userBooking = payload;
    },
    setPaymentCards(state, payload) {
      state.paymentCards = payload;
    },
    updateChildren(state, payload) {
      state.searchHotelFilter.people.children = payload;
    },
  },
  actions: {
    // actions får tillgång till context objektet
    async fetchHotelById() {
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
    async fetchUserBookingList(context) {
      let response = await fetch("/rest/bookings/userbookings");
      let json = await response.json();
      context.commit("setUserBookingList", json);
    },
    async fetchUserBooking(context, payload) {
      const url = "/rest/bookings/id/" + payload;
      let response = await fetch(url);
      let json = await response.json();
      context.commit("setUserBooking", json);
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
