<template>
  <div id="nav">
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

      this.$store.commit("setUserBookings", []);

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
}
a {
  position: right;
  font-weight: bold;
  color: #2c3e50;
  &.router-link-exact-active {
    color: #42b983;
  }
}
#navbutton {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
