<template>
  <body>
    <div>
      <form @submit.prevent="toStripeCheckout">
        <button class="confirm-booking" type="submit">Confirm booking</button>
      </form>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      sessionId: null,
    };
  },
  props: ["totalBookingCost", "hotelInfo"],
  computed: {
    loggedInUser() {
      return this.$store.state.loggedInUser;
    },
    isLoggedIn() {
      return this.loggedInUser != null;
    },
  },
  methods: {
    //This function sends us to the stripe checkout
    async toStripeCheckout() {
      //first checks if user is logged in
      if (!this.isLoggedIn) {
        alert("Please login or sign up at top of this booking page");
        window.scrollTo(0, 0);
      } else {
        this.$store.commit("setTotalCost", this.totalBookingCost);
        await this.$store.dispatch("fetchCreateBooking");

        var stripe = Stripe(
          "pk_test_51IxU9qEuj6pxFvwiy7str1sRLwz43ylGHLiXkRzZuLVr08JZtnNYMbzzp27tQinEA5i8qXHOvAO0PBTEM1zBUpLT00L9DdTCNU"
        );

        let payload = {
          hotelName: this.hotelInfo.name,
          totalCost: this.totalBookingCost,
        };

        await fetch("/rest/payments/stripe/checkoutsession", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (session) {
            return stripe.redirectToCheckout({ sessionId: session.id });
          })
          .then(function (result) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, you should display the localized error message to your
            // customer using `error.message`.
            if (result.error) {
              alert(result.error.message);
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.confirm-booking {
  display: inline-block;
  border: 4px;
  border-radius: 20px;
  background-color: rgb(15, 192, 68);
  padding: 20px 18px;
  cursor: pointer;
  font-size: 32px;
}
</style>
