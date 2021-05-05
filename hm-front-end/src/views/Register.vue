<template>
    <h1>Register page</h1>
    <input v v-model="email" type="text" placeholder="Email" required>
    <input v v-model="password" type="password" placeholder="Passowrd" required>
    <input type="text" placeholder="First name">
    <input type="text" placeholder="Last name">
    <a type="button" @click="x">Register</a>
</template>
<script>

export default {
    setup() {
        
    },
}
</script>
