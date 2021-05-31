<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    &nbsp;&middot;&nbsp;
    <router-link to="/about">About</router-link>
    &nbsp;&middot;&nbsp;
    <router-link to="/register">Register</router-link>
    &nbsp;&middot;&nbsp;
    <router-link to="/login">Login</router-link>
    &nbsp;&middot;&nbsp;
    <router-link to="/result-page">Result</router-link>

    <button class="navbutton" @click="$router.push('Register')">Register</button>
    <button class="navbutton" @click="logout">Logout</button>
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
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped lang="scss">
#nav {
  display: inline-block;

  a {
    position: right;
    font-weight: bold;
    color: #1a88bb;
    &.router-link-exact-active {
      color: rgb(27, 149, 94);
    }
  }

  .navbutton {
    margin-left: 10px;
  }
}
#navbutton {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
