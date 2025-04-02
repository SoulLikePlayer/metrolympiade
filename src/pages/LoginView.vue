<template>
  <div class="auth-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const { loginUser } = useAuth();
const router = useRouter();

const handleLogin = () => {
  loginUser({ email: email.value, password: password.value }, (error, data) => {
    if (!error) router.push("/");
    else console.error("Erreur de connexion", error);
  });
};
</script>