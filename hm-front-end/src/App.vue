<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    -
    <router-link to="/about">About</router-link>
    -
    <router-link to="/Register">Register</router-link>
    -
    <router-link to="/Login">Login</router-link>
    -
    <router-link to="/result-page">Result</router-link>
    -
    <router-link to="/hotelView">Hotel</router-link>
    -
    <button @click="logout">Logout</button>
  </div>
  <router-view />
</template>

<script>
export default {
   
  methods: {
    logout() {
            //logout from backend
            fetch('/logout', {mode: 'no-cors'})
            
            //removes user from store.js
            this.$store.commit('setLoggedInUser', null)
            },
          }
}
</script>

<style lang="scss" src="./style.scss"></style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;

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
}
</style>
