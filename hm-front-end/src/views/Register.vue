<template>
  <h1>Register page</h1>
  <input v-model="email" type="text" placeholder="email" required />
  <input v-model="password" type="password" placeholder="password" required />
  <input v-model="first_name" type="text" placeholder="First name" required />
  <input v-model="last_name" type="text"  placeholder="Last name" required />
  <button @click="register()">register</button>
</template>
<script>
export default {
  methods: {
    async register() {
     
      let credentials = {
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name
      };

      let response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      console.log("i work" + response);
    

    },
  },
};
</script>
