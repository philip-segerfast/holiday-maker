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
    &nbsp;&middot;&nbsp;
    <span class="show-logged-in" v-if="$store.getters.getLoggedInUser != null">
      <h4>Signed in as: {{ $store.getters.getLoggedInUser.email }}</h4>
    </span>
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
.show-logged-in {
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
    color: #1a88bb;
    &.router-link-exact-active {
      color: rgb(27, 149, 94);
    }
  }

  .navbutton {
    display: inline-block;
    margin-left: 10px;
  }
}
#navbutton {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
