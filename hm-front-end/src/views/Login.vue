<template>
  <div>
    <form @submit.prevent="login">
      <input v-model="email" name="email" type="email" placeholder="email" required />
      <input v-model="password" type="password" placeholder="password" required />
      <button type="submit">Login</button>
    </form>
    <router-link to="/Register">if you dont have account click here </router-link>
    <span v-if="$store.getters.getLoggedInUser != null">
      Logged in as: {{ $store.getters.getLoggedInUser.email }}
    </span>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      //Putting email/password in credentials and change special signs like @
      const credentials =
        "username=" +
        encodeURIComponent(this.email) +
        "&password=" +
        encodeURIComponent(this.password);

      //Login to backend using email/password in credentials
      let response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        mode: "no-cors",
        body: credentials,
      });
      //Using backend WhoAmI to se who is logged in to backend
      let user = await fetch("/auth/whoami");
      try {
        user = await user.json();

        //save user in store using setLoggedInUser mutation
        this.$store.commit("setLoggedInUser", user);
        console.log(user.email + " is logged in");
      } catch (err) {
        alert("Wrong username/password");
      }

      if (response.url.includes("error")) {
        console.log("Wrong username/password");
      }
    },
  },
};
</script>
