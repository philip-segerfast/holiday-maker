<template>
  <form>
    <input
      v-model="email"
      name="email"
      type="email"
      placeholder="email"
      required
    />
    <input v-model="password" type="password" placeholder="Password" required />
    <button @click="login">login</button>
    <router-link to="/register">
      If you dont have an account, click here</router-link
    >
  </form>
</template>

<script>
export default {
  name: "Login",

  methods: {
    async login() {
      // put email and password in credentials and make them encoded
      const credentials =
        "email=" +
        encodeURIComponent(this.email) +
        "&password=" +
        encodeURIComponent(this.password);

      // login to backend

      let request = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        mode: "no-cors",
        body: credentials,
      };
      let response = await fetch("/login", request);

      // using WhoAmI in backend tosee who is logged in
      let user = await fetch("/auth/whoami")
      try{
        user=await user.json()
        this.$store.comit("setLoggedInUser", user)
        alert("welcome" + user.email)}
    catch{ console.log("wrong")
      
    }
    if(response.url.includes("error")){
      console.log("wrong username or password")
    }
    },
  },
};
</script>