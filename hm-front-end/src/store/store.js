import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    hotels: [],
    allHotelTags: [],
    HotelSearch: {},
    hotelRooms: [],
    addedHotelRooms: [],
    hotelToBook: {},
    hotelImages: [],
    hotel: {},
    hotelId: 1,
    livery: String,
    totalCost: 0,
    tempHotelName: "",
    routePath: "", // Because you can't access routePath from vuex store. This variable is updated i App.vue.
    roomsCost: 0,
    maxExtraBeds: 0,
    extraLiveryCost: 0,
    searchHotelFilter: {
      searchText: "",
      checkInDates: {
        startDate: "",
        endDate: "",
      },
      AmountOfExtraBeds: 0,
      people: {
        adultsAmount: 0,
        children: [],
      },
      shouldDoSidenavFilter: false,
      beachDistance: 0,
      centerDistance: 0,
      selectedHotelTags: [],
      orderBy: "",
    },
    hotelById: {}, // Använd this.$route.params.id istället  -Kan behöva förklaras
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

    newBooking: {
      fromTime: "1615244400",
      toTime: "1615503600",
      children: [
        {
          age: 11,
        },
      ],
      adults: 2,
      extraBeds: 0,
      luxuryClass: 4,
      user: {
        id: 1,
      },
      hotelRooms: [
        {
          id: 3,
        },
        {
          id: 4,
        },
      ],
    },
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
    // Sorterar alla hotelrum utifrån lägst --> högst
    setHotelRooms(state, payload) {
      state.hotelRooms = payload;
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
    updateAdultsAmount(state, adultsAmount) {
      state.searchHotelFilter.people.adultsAmount = adultsAmount;
    },
    addRoomToBooking(state, room) {
      state.addedHotelRooms.push(room);
    },
    updateMaxExtraBeds(state, payload) {
      state.maxExtraBeds = this.state.maxExtraBeds + payload;
      console.log("Hej detta är ett test" + state.maxExtraBeds);
    },
    setHotelToBook(state, payload) {
      state.hotelToBook = payload;
    },
    updateRoomsCost(state, payload) {
      state.roomsCost = this.state.roomsCost + payload;
    },
    setTotalCost(state, payload) {
      state.totalCost = payload;
    },
    setSelfCatering(state, payload) {
      state.selfCatering = payload;
    },
    setHalfPension(state, payload) {
      state.halfPension = payload;
    },
    setFullBoard(state, payload) {
      state.fullBoard = payload;
    },
    setLivery(state, payload) {
      state.livery = payload;
      console.log(state.livery);
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
    setUserBookingRooms(state, payload) {
      state.userBooking.hotelRooms = payload;
    },
    updateChildren(state, payload) {
      state.searchHotelFilter.people.children = payload;
    },
    updateCenterDistance(state, payload) {
      state.searchHotelFilter.centerDistance = payload;
    },
    updateBeachDistance(state, payload) {
      state.searchHotelFilter.beachDistance = payload;
    },
    updateAllHotelTags(state, payload) {
      state.allHotelTags = payload;
    },
    selectHotelTag(state, payload) {
      let selectedTags = state.searchHotelFilter.selectedHotelTags;
      selectedTags.push(payload);
    },
    unselectHotelTag(state, payload) {
      state.searchHotelFilter.selectedHotelTags = state.searchHotelFilter.selectedHotelTags.filter(
        (tag) => tag !== payload
      );
    },
    updateRoute(state, payload) {
      state.routePath = payload;
    },
    updateOrderBy(state, payload) {
      console.log("order by: ", payload);
      state.searchHotelFilter.orderBy = payload;
    },
  },
  actions: {
    async fetchAllHotels(context) {
      // fetch alla hotel från backend och lägg i response-variabeln
      let response = await fetch("/rest/hotels/all-hotels");
      // gör om response till json objekt
      let json = await response.json();

      //console.log("Response:");
      // console.log(json);

      // objektet context gör så att vi kan commita alla hotels, json??
      context.commit("setAllHotels", json);
    } /*
    async fetchHotelRoomsByHotel() {
      console.log("hotel id: " + this.state.hotelId);
      const url = "/rest/hotels/get-rooms/" + this.state.hotelId;
      await axios.get(url).then((response) => {
        this.commit("setHotelRooms", response.data);
      });
    },*/,
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
    async fetchUpdateBooking(context) {
      let booking = this.state.userBooking;
      console.log("Running fetchUpdateBooking. Edited booking object:");
      console.log(booking);
      const url = "/rest/bookings/" + booking.id;
      let response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });
      await response.text();
    },
    async fetchCreateBooking() {
      let booking = {
        fromTime: this.state.searchHotelFilter.checkInDates.startDate,
        toTime: this.state.searchHotelFilter.checkInDates.endDate,
        children: [{ age: 11 }], //this.state.searchHotelFilter.peopleAmount.childrenAmount,
        adults: this.state.searchHotelFilter.people.adultsAmount,
        user: this.state.loggedInUser,
        hotelRooms: this.state.addedHotelRooms,
      };
      //let booking = this.state.newBooking;
      console.log("Running fetchCreateBooking. New booking object:");
      console.log(booking);
      const url = "/rest/bookings/add";
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });
      let answer = await response.json();
      console.log(answer);
    },
    async fetchAllHotelTags(context) {
      const url = "/rest/tags";
      let response = await fetch(url);
      let json = await response.json();
      context.commit("updateAllHotelTags", json);
    },
    // Filtering hotels here because I need access to the context object
    setFilteredHotels(context, state) {
      const allHotels = this.state.hotels;
      /* 
        .call används för att bestämma vad "this" ska referera till när man använder det i den följande metoden.
        Annars refererar det till webbläsarfönstret, vilket inte är önskvärt.
        Detta för att bland annat kunna referera till this.state. 
      */
      let filteredHotels;
      filteredHotels = filterHotelsByCity.call(this, allHotels);
      filteredHotels = filterHotelsByAmountOfPeople.call(this, filteredHotels);
      filteredHotels = filterHotelsByCheckin.call(this, filteredHotels);
      // If we are at the search results page (side-filter is visible), do these filterings:
      if (["Result"].includes(this.state.routePath)) {
        filteredHotels = filterHotelsByTags.call(this, filteredHotels);
        filteredHotels = filterHotelsByBeachDistance.call(this, filteredHotels);
        filteredHotels = filterHotelsByCenterDistance.call(this, filteredHotels);
      }

      console.log("Before sorting: ", filteredHotels);

      const orderBy = this.state.searchHotelFilter.orderBy;
      switch (orderBy) {
        case "min-price":
          filteredHotels = filterByMinPrice.call(this, filteredHotels);
          break;
        case "max-price":
          filteredHotels = filterByMaxPrice.call(this, filteredHotels);
          break;
        case "ratings":
          filteredHotels = filterByRatings.call(this, filteredHotels);
          break;
      }

      console.log("After sorting: ", filteredHotels);
      console.log("Amount of results: ", filteredHotels.length);
      console.log("==============================");

      // Save the filtered list to state.
      this.state.filteredHotels = filteredHotels;

      function filterByMinPrice(listToFilter) {
        return listToFilter.sort((price1, price2) => {
          if (price1.minRoomPrice < price2.minRoomPrice) {
            return -1;
          }
          if (price1.minRoomPrice > price2.minRoomPrice) {
            return 1;
          }
          return 0;
        });
      }
      function filterByMaxPrice(listToFilter) {
        return listToFilter
          .sort((price1, price2) => {
            if (price1.minRoomPrice < price2.minRoomPrice) {
              return -1;
            }
            if (price1.minRoomPrice > price2.minRoomPrice) {
              return 1;
            }
            return 0;
          })
          .reverse();
      }
      function filterByRatings(listToFilter) {
        return listToFilter
          .sort((hotel1, hotel2) => {
            let hotel1AvgRating = hotel1.averageRating;
            let hotel2AvgRating = hotel2.averageRating;

            if (isNaN(hotel1AvgRating)) {
              return -1;
            }
            if (isNaN(hotel2AvgRating)) {
              return 1;
            }
            if (hotel1AvgRating > hotel2AvgRating) {
              return 1;
            }
            if (hotel1AvgRating < hotel2AvgRating) {
              return -1;
            }
            if (hotel1AvgRating == hotel2AvgRating) {
              return 0;
            }
          })
          .reverse();
      }

      function filterHotelsByCity(listToFilter) {
        let searchPhraseLower = this.state.searchHotelFilter.searchText.toLowerCase();

        if (searchPhraseLower != "") {
          // console.log("Filtering on search-phrase: ", searchPhraseLower);
          let filteredOutput = listToFilter.filter((hotel) => {
            let hotelCityLower = hotel.city.toLowerCase();
            let hotelName = hotel.name.toLowerCase();
            return (
              hotelCityLower.includes(searchPhraseLower) || hotelName.includes(searchPhraseLower)
            );
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

        console.log("filterStartDate", filterStartDate);
        console.log("filterEndDate", filterEndDate);

        const filteredOutput = listToFilter.filter((hotel) => {
          const hotelRooms = hotel.hotelRooms;
          if (hotelRooms.length > 0) {
            // filteredRooms contains all Available rooms
            const filteredRooms = context.getters.getFilteredRoomsByCheckinDates(hotelRooms);

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
        const adultsAmount = parseInt(this.state.searchHotelFilter.people.adultsAmount);
        if (adultsAmount <= 0) {
          // console.log("No adults specified. You need to have at least one adult on the booking.");
          return listToFilter;
        }

        const qualifiedHotels = listToFilter.filter((hotel) => {
          let qualifiedRooms = context.getters.getFilteredHotelRoomsByAmountOfPeople(
            hotel.hotelRooms
          );

          if (qualifiedRooms.length > 0) {
            return true;
          } else {
            return false;
          }
        });

        return qualifiedHotels;
      }

      function filterHotelsByTags(listToFilter) {
        let selectedTagIds = this.state.searchHotelFilter.selectedHotelTags.map((tag) => tag.id);
        if (selectedTagIds.length === 0) {
          return listToFilter;
        }
        let output = listToFilter.filter((hotel) => {
          let hotelTagIds = hotel.hotelTags.map((tag) => tag.id);
          // alla selectedTags måste finnas i hotel.hotelTags
          if (selectedTagIds.every((selectedTagId) => hotelTagIds.includes(selectedTagId))) {
            return true;
          } else {
            return false;
          }
        });
        return output;
      }

      function filterHotelsByBeachDistance(listToFilter) {
        const maxBeachDistanceFilter = this.state.searchHotelFilter.beachDistance;

        const output = listToFilter.filter((hotel) => {
          const hotelBeachDistance = hotel.beachDistance;
          if (hotelBeachDistance <= maxBeachDistanceFilter || maxBeachDistanceFilter == 0) {
            return true;
          } else {
            return false;
          }
        });
        return output;
      }

      function filterHotelsByCenterDistance(listToFilter) {
        const maxCenterDistanceFilter = this.state.searchHotelFilter.centerDistance;

        const output = listToFilter.filter((hotel) => {
          const hotelCenterDistance = hotel.centerDistance;
          if (hotelCenterDistance <= maxCenterDistanceFilter || maxCenterDistanceFilter == 0) {
            return true;
          } else {
            return false;
          }
        });
        return output;
      }
    },
  },
  getters: {
    getUserId(state) {
      return state.loggedInUser;
    },
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
    getRoomsCost(state) {
      return state.roomsCost;
    },
    getExtraCost(state) {
      return state.extraLiveryCost;
    },
    getMaxExtraBeds(state) {
      return state.maxExtraBeds;
    } /*
    getHotelById(state) {
      return state.hotelById;
    },*/,
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
      return state.searchHotelFilter.people.adultsAmount;
    },
    getChildrenAmount(state) {
      return state.searchHotelFilter.people.children.length;
    },
    getStartDate(state) {
      return state.searchHotelFilter.checkInDates.startDate;
    },
    getEndDate(state) {
      return state.searchHotelFilter.checkInDates.endDate;
    },
    getBeachDistance(state) {
      return state.searchHotelFilter.beachDistance;
    },
    getCenterDistance(state) {
      return state.searchHotelFilter.centerDistance;
    },
    getAllHotelTags(state) {
      return state.allHotelTags;
    },
    getSelectedHotelTags(state) {
      return state.searchHotelFilter.selectedHotelTags;
    },
    getExtraCostLivery(state) {
      const livery = state.livery;
      const hotelToBook = state.hotelToBook;
      const adultsAmount = state.searchHotelFilter.people.adultsAmount;

      switch (livery) {
        case "self":
          return hotelToBook.selfCateringPrice;
        case "half":
          return hotelToBook.halfPensionPrice * adultsAmount;
        case "full":
          return hotelToBook.fullBoardPrice * adultsAmount;
        case "all":
          return hotelToBook.allInclusivePrice * adultsAmount;
      }
    },
    getRoutePath(state) {
      return state.routePath;
    },
    getFilteredRooms: (state, getters) => (hotel) => {
      let hotelRooms = hotel.hotelRooms;
      let outputRooms = getters.getFilteredHotelRoomsByAmountOfPeople(hotelRooms);
      outputRooms = getters.getFilteredRoomsByCheckinDates(outputRooms);

      return outputRooms;
    },
    getFilteredHotelRoomsByAmountOfPeople: (state) => (hotelRooms) => {
      const statePeopleAmount = state.searchHotelFilter.people;
      const adultsAmount = parseInt(statePeopleAmount.adultsAmount);
      const childrenAmount = parseInt(statePeopleAmount.children.length);
      const totalAmountOfPeople = adultsAmount + childrenAmount;

      // Hämta ut alla hotell som har rum som tillåter lika många personer som i peopleAmount
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

      return qualifiedRooms;
    },
    getFilteredRoomsByCheckinDates: (state) => (roomsToFilter) => {
      const filter = state.searchHotelFilter;
      const filterStartDate = filter.checkInDates.startDate;
      const filterEndDate = filter.checkInDates.endDate;

      if (!filterStartDate || !filterEndDate) {
        // console.log("You need to specify a start and end date.");
        return roomsToFilter;
      }

      if (roomsToFilter.length > 0) {
        // filteredRooms contains all Available rooms
        const filteredRooms = roomsToFilter.filter((room) => {
          const bookings = room.bookings;
          if (bookings.length > 0) {
            // Loopar igenom bokningarna med en vanlig for-loop för for-each-loop
            // funkar inte av någon konstig anledning...
            for (let i = 0; i < bookings.length; i++) {
              let booking = bookings[i];

              const bookingStartDate = booking.fromTime;
              const bookingEndDate = booking.toTime;

              /* Om datumfiltret slutar innan bokningen och 
                      Om datumfiltret börjar efter bokningens slutdatum
                        - då är det ledigt. */

              if (filterEndDate < bookingStartDate || filterStartDate > bookingEndDate) {
                // Ledigt
                // console.log("No booking found within searched period.");
                return true;
              } else {
                // console.log("Booking found within searched period.");
                return false;
              }
            }
          } else {
            return true;
          }
        });

        return filteredRooms;
      } else {
        // Hotel didn't have any rooms at all.
        return [];
      }
    },
    getHotelById: (state) => (hotelId) => {
      let hotels = state.hotels;

      for (let i = 0; i < hotels.length; i++) {
        let hotel = hotels[i];
        if (hotel.id == hotelId) {
          return hotel;
        }
      }
      return null;
    },
  },
});
