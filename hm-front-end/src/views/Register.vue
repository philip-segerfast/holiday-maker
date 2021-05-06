<template>
  <h1>Register page</h1>
  <form>
    <input v-model="email" name="email" type="email" placeholder="email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <input v-model="first_name" type="text" placeholder="First name" required />
    <input v-model="last_name" type="text" placeholder="Last name" required />
    <button @click="register">
      Submit
    </button>
  </form>
</template>
<script>
export default {
  name: "Register",

  methods: {
    async register() {
      
      let credentials = {
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
      };

      let request = {
        method : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      }
      await fetch("/auth/register", request) 
 
      },
    },
};
</script>
