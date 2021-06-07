<template>
  <div class="Registration">
    <div class="sign-up" v-if="$store.getters.getLoggedInUser == null">
      <!--skapar form så användaren kan mata in sina uppgifter -->
      <button class="show-register" @click="clickRegistration = !clickRegistration">Sign up</button>
      <div class="registration-btn" v-if="clickRegistration">
        <br />
        <form @submit.prevent="register">
          <div class="inputs" v-if="$store.getters.getLoggedInUser == null">
            <div v-show="inputs"></div>
            <input v-model="email" name="email" type="email" placeholder="email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <input
              class="f-name"
              v-model="first_name"
              type="text"
              placeholder="First name"
              required
            />
            <input
              class="l-name"
              v-model="last_name"
              type="text"
              placeholder="Last name"
              required
            />
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
      await fetch("/auth/register", request);
      alert("Registered successfully!");
    },
  },
};
</script>
<style scoped lang="scss">
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
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
}
</style>
