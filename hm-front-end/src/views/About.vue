<template>
  <div class="about">
    <h1>This is an about page</h1>
    <StripeCheckout />
  </div>
</template>

<script>
import StripeCheckout from "../components/StripeCheckout.vue";
export default {
  components: { StripeCheckout },
};
</script>
