<template>
  <div class="Sign-in">
    <button @click="clickSignIn = !clickSignIn">Sign in</button>
    <div class="sign-in-btn" v-if="clickSignIn">
      <form @submit.prevent="login">
        <div class="inputs" v-if="$store.getters.getLoggedInUser == null">
          <div v-show="inputs"></div>
          <input v-model="email" name="email" type="email" placeholder="email" required />
          <input v-model="password" type="password" placeholder="password" required />
          <button @click="submit">Login</button>
          <div class="submit-button" v-if="submit"></div>
          <div class="submit-button" v-else>
            <br />
            <!-- <router-link to="/Register">if you dont have account click here </router-link> -->
          </div>
        </div>
        <span v-if="$store.getters.getLoggedInUser != null">
          <br />
          <h2>Signed in as: {{ $store.getters.getLoggedInUser.email }}</h2>
        </span>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      clickSignIn: false,
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
    logout() {
      //logout from backend
      fetch("/logout", { mode: "no-cors" });

      this.$store.commit("setUserBookingList", []);

      //removes user from store.js
      this.$store.commit("setLoggedInUser", null);
    },
  },
};
</script>
<style scoped lang="scss"></style>
