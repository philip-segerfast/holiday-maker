<template>
  <div class="Registration">
    <div class="sign-up" v-if="$store.getters.getLoggedInUser == null">
      <!--skapar form så användaren kan mata in sina uppgifter -->
      <button class="show-register" @click="clickRegistration = !clickRegistration">
        Click here to sign up
      </button>
      <div class="registration-btn" v-if="clickRegistration">
        <br />
        <form @submit.prevent="register">
          <div class="inputs" v-if="$store.getters.getLoggedInUser == null">
            <div v-show="inputs"></div>
            <input v-model="email" name="email" type="email" placeholder="email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <input
              class="names"
              v-model="first_name"
              type="text"
              placeholder="First name"
              required
            />
            <input class="names" v-model="last_name" type="text" placeholder="Last name" required />
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  //för route
  name: "Register",

  data() {
    return {
      clickRegistration: false,
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    };
  },

  methods: {
    async register() {
      console.log(this.email, this.password, this.first_name, this.last_name);

      //lägger de i credentails (objekt)
      let credentials = {
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
      };
      //gör en POST request
      //lägger credentials i body
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      };

      //fetchar request
      let registerFetch = await fetch("/auth/register", request);
      try {
        await registerFetch.json();
        alert("you are registered");
      } catch (error) {
        alert("this email already exists");
      }
    },
  },
};
</script>
<style scoped lang="scss">
.names {
  width: 50%;
  padding: 1px 2px;
  padding-top: 1px;
  padding-right: 2px;
  padding-bottom: 1px;
  padding-left: 2px;
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: -internal-light-dark(black, white);
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  appearance: auto;
  background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
  -webkit-rtl-ordering: logical;
  cursor: text;
  margin: 0em;
  font: 400 13.3333px Arial;
  padding: 1px 2px;
  border-width: 2px;
  border-style: inset;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  border-image: initial;
  border-radius: 2px;
}
.Registration {
  display: inline-block;
  background-color: #1a88bb;
  border-radius: 30px;
  width: 250px;
}

.show-register {
  box-shadow: var(--box-shadow-outline-border);
  margin-right: 10px;
  background-color: rgba(230, 211, 48);
  border: none;
  height: 50px;
  height: 100%;
  width: 100px;
  margin-bottom: 5px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
}
</style>
