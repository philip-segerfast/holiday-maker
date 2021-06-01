<template>
  <div class="row">
    <div class="col-75">
      <div class="container">
        <form>
          <label for="cardname">Firstname</label>
          <input type="text" id="cname" name="cardname" placeholder="Lasse" />
          <label for="cardlname">Lastname</label>
          <input type="text" id="lname" name="lastname" placeholder="Lassesson" />
          <label for="card-number">Card number</label>
          <input type="text" id="cardnumber" name="cnumber" placeholder="111 222 333 444 555" />

          <div class="row">
            <div class="col-50">
              <label for="expyear">Exp Year</label>
              <input type="text" id="expyear" name="expyear" placeholder="2018" />
            </div>
            <div class="col-50">
              <label for="cvc">CVC</label>
              <input type="text" id="cvc" name="cvc" placeholder="352" />
            </div>
            <h2>payment totalcost: 12000</h2>
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
    createPayment() {
      console.log("CLICK - Create Payment!");
      this.$store.dispatch("fetchCreatePayment");
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
