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
};

methods: {
  async login() {
  const credentials =
    "username=" +
    encodeURIComponent(this.email) +
    "&password=" +
    encodeURIComponent(this.password);
    }

    let response = await fetch("/login",{
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      mode: 'no-cors',
      body: credentials
    });
}
</script>
