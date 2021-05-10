<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    -
    <router-link to="/about">About</router-link>
    -
    <router-link to="/register">Register</router-link>
    -
    <router-link to="/login">Login</router-link>
    -
    <router-link to="/result-page">Result</router-link>
    -
    <router-link to="/hotelView">Hotel</router-link>
    -
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
   
  methods: {
    logout() {
            //logout from backend
            fetch('/logout', {mode: 'no-cors'})
            
            //removes user from store.js
            this.$store.commit("setLoggedInUser", null)

            //Shows page Home after pressing logout
            this.$router.push({path: "/"})
            },

          }
}
</script>

<style lang="scss" src="../style.scss"></style>

<style lang="scss">

  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

</style>