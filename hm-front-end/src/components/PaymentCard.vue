<template>
  <div class="row">
    <div class="col-75">
      <div class="container">
        <form>
          <label for="cardname">Firstname</label>
          <input
            v-model="first_name"
            id="cname"
            name="cardname"
            placeholder="Enter your first name"
            required
          />
          <label for="cardlname">Lastname</label>
          <input
            v-model="last_name"
            id="lname"
            name="lastname"
            placeholder="Enter your last name"
            required
          />
          <label for="card-number">Card number</label>
          <input
            v-model="card_number"
            id="cardnumber"
            name="cnumber"
            placeholder="ex: 111 222 333 444 555"
            required
          />

          <div class="row">
            <div class="col-50">
              <label for="expyear">End date</label>
              <input
                v-model="end_date"
                id="expyear"
                name="expyear"
                placeholder="22/5-2023"
                required
              />
            </div>
            <div class="col-50">
              <label for="cvc">CVC</label>
              <input v-model="cvc" id="cvc" name="cvc" placeholder="cvc" required />
            </div>
            <h2>payment totalcost:</h2>
            <br />
            <form @submit.prevent="createPayment">
              <button class="btn" type="submit">Create Payment</button>
            </form>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      card_number: "",
      end_date: "",
      cvc: "",
    };
  },
  // this logic works in createPayment
  //   async registerPayment() {
  //     console.log("Starting payment registration");
  //     let credentials = {
  //       first_name: this.first_name,
  //       last_name: this.last_name,
  //       card_number: this.card_number,
  //       end_date: this.end_date,
  //       cvc: this.cvc,
  //     };
  //     let request = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(credentials),
  //     };
  //     await fetch("/rest/payments", request);
  //     console.log(this.first_name, this.last_name, this.card_number, this.end_date, this.cvc);
  //   },
  // },
  computed: {
    cardHolders() {
      return this.$store.getters.getCardHolderName;
    },
    cardNumbers() {
      return this.$store.getters.getCardNumber;
    },
    cardEndDates() {
      return this.$store.getters.getCardEndDate;
    },
    cardCvc() {
      return this.$store.getters.getCardCvc;
    },
    paymentTotalCost() {
      return this.$store.getters.getPaymentTotalCost;
    },
  },
  methods: {
    async createPayment() {
      console.log("Starting payment registration");
      let credentials = {
        cardHolderName: this.first_name + " " + this.last_name,
        cardNumber: this.card_number,
        cardEndDate: this.end_date,
        cardCvc: this.cvc,
      };
      console.log(JSON.stringify(credentials));
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      };
      await fetch("/rest/payments", request);
    },
  },
};
</script>

<style>
.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}

.col-50 {
  padding: 0 16px;
}
.col-75 {
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
}
.col-50,
.col-75 {
  padding: 0 40px;
}

.container {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  margin: 10%;
}

input[type="text"] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: #04aa6d;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (and change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}
</style>
