<template>
  <h1>Register page</h1>
  <!--skapar form så användaren kan mata in sina uppgifter -->
  <form>
    <input
      v-model="email"
      name="email"
      type="email"
      placeholder="email"
      required
    />
    <input v-model="password" type="password" placeholder="Password" required />
    <input v-model="first_name" type="text" placeholder="First name" required />
    <input v-model="last_name" type="text" placeholder="Last name" required />
    <button @click="register">Register</button>
  </form>
</template>
<script>
export default {
  //för route
  name: "Register",

  methods: {
    async register() {
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
    },
  },
};
</script>
