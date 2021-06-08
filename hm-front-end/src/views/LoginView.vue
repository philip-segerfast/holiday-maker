<template>
  <div class="Sign-in">
    <div class="log-in">
      <form @submit.prevent="login">
        <div class="inputs" v-if="$store.getters.getLoggedInUser == null">
          <div v-show="inputs"></div>
          <input v-model="email" name="email" type="email" placeholder="email" required />
          <input v-model="password" type="password" placeholder="password" required />
          <br />
          <button class="loginButton" @click="submit">Login</button>
          <div class="submit-button" v-if="submit"></div>
          <div class="submit-button" v-else>
            <router-link to="/Register">
              <span class="loginButton">Click here to register</span></router-link
            >
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
        this.$router.push("/");
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
<style scoped lang="scss">
.loginButton {
  display: inline-block;
  margin-left: 10px;
  background-color: transparent;
  cursor: pointer;
  position: right;
  font-weight: bold;
  color: #f4d160;
  border: 0;
  margin: 0;
  padding: 0;
  font-size: 16px;
}

.inputs {
}
.Sign-in {
  display: inline-block;
  background-color: #1a88bb;
  border-radius: 30px;
  width: 250px;
}

.sign-in-btn {
  box-shadow: var(--box-shadow-outline-border);
  margin-right: 10px;
  background-color: rgb(230, 211, 48);
  border: none;
  height: 100%;
  width: 100px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
}
</style>
