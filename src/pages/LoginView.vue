<template>
  <div class="auth-container login-style">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-control">
        <input v-model="email" type="email" required placeholder=" " />
        <label>
          <span v-for="(char, i) in 'Email'" :key="i" :style="{ transitionDelay: `${i * 50}ms` }">{{ char }}</span>
        </label>
      </div>

      <div class="form-control">
        <input v-model="password" type="password" required placeholder=" " />
        <label>
          <span v-for="(char, i) in 'Mot de passe'" :key="i" :style="{ transitionDelay: `${i * 50}ms` }">{{ char }}</span>
        </label>
      </div>

      <button class="submit-btn" type="submit">Se connecter</button>
      <p class="link-text">
        Pas encore de compte ?
        <router-link to="/register">Créer un compte</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";
import "../assets/style/Auth.css";


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
