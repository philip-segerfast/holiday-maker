<template>
  <div id="nav">
    <span id="show-logged-in" v-if="$store.getters.getLoggedInUser != null">
      <h4>{{ $store.getters.getLoggedInUser.first_name }}</h4>
    </span>
    &nbsp; &nbsp;
    <router-link class="navRoute" to="/">Home</router-link>

    <span id="show-login-button" v-if="$store.getters.getLoggedInUser == null">
      &nbsp;
      <router-link class="navRoute" to="/login">Login</router-link>
    </span>
    &nbsp;
    <!--&nbsp;&middot;&nbsp;
    <router-link to="/" tag="button">Logout</router-link> -->

    &nbsp;
    <!--<button class="navbutton" @click="$router.push('Register')">Register</button> -->
    <div id="hide-logout-button" v-if="$store.getters.getLoggedInUser != null">
      <button class="navbutton" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      //logout from backend
      fetch("/logout", { mode: "no-cors" });

      this.$store.commit("setUserBookingList", []);

      //removes user from store.js
      this.$store.commit("setLoggedInUser", null);

      //Shows page Home after pressing logout
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
#show-logged-in {
  font-style: italic;
  color: white;
  display: inline-block;
  h4 {
    margin: 0;
  }
}
#nav {
  display: inline-block;

  a {
    position: right;
    font-weight: bold;
    color: rgb(137, 149, 27);
    &.router-link-exact-active {
      color: #f4d160;
    }
  }

  .navbutton {
    display: inline-block;
    margin-left: 10px;
    background-color: transparent;
    cursor: pointer;
    position: right;
    font-weight: bold;
    color: rgb(137, 149, 27);
    border: 0;
    margin: 0;
    padding: 0;
    font-size: 16px;
    text-decoration: underline;
  }
}
</style>
