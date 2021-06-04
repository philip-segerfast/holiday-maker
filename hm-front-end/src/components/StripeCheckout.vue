<template>
  <div>
    <form @submit.prevent="toStripeCheckout">
      <button type="submit">Confrim booking</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sessionId: null,
      hotelName: "Sunny Side Hotel",
      totalCost: 300,
    };
  },
  computed: {},
  methods: {
    //This function sends us to the stripe checkout
    async toStripeCheckout() {
      var stripe = Stripe(
        "pk_test_51IxU9qEuj6pxFvwiy7str1sRLwz43ylGHLiXkRzZuLVr08JZtnNYMbzzp27tQinEA5i8qXHOvAO0PBTEM1zBUpLT00L9DdTCNU"
      );

      let payload = {
        hotelName: this.hotelName,
        totalCost: this.totalCost,
      };

      await fetch("/rest/payments/stripe/session", {
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
    },
  },
};
</script>
