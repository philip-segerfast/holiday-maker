<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="(v) => (loading = v)"
    />
    <button @click="submit">Pay now!</button>
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
export default {
  components: {
    StripeCheckout,
  },
  data() {
    this.publishableKey =
      "pk_test_51IxU9qEuj6pxFvwiy7str1sRLwz43ylGHLiXkRzZuLVr08JZtnNYMbzzp27tQinEA5i8qXHOvAO0PBTEM1zBUpLT00L9DdTCNU";
    return {
      loading: false,
      lineItems: [
        {
          //name: "TestHotel",
          price: "price_1IxpOGEuj6pxFvwiLcDDknXF", // The id of the one-time price you created in your Stripe dashboard
          quantity: 425,
        },
      ],
      successURL: "http://localhost:3000/",
      cancelURL: "http://localhost:3000/about",
    };
  },
  methods: {
    submit() {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>
