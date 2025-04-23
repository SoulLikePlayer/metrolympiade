<template>
  <div class="auth-container login-style">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="wave-group">
        <input v-model="email" type="email" required class="input" placeholder=" "/>
        <label class="label">
          <span v-for="(char, i) in 'Email'":key="i" class="label-char" :style="{ '--index': i }">
            {{ char }}
          </span>
        </label>
        <span class="bar"></span>
      </div>

      <div class="wave-group">
        <input v-model="password" type="password" required class="input" placeholder=" "/>
        <label class="label">
          <span v-for="(char, i) in 'Mot de passe'.split('')" :key="i" class="label-char" :style="{ '--index': i }">
            {{ char === ' ' ? '\u00A0' : char }}
          </span>
        </label>
        <span class="bar"></span>
      </div>

      <button type="submit">Se connecter</button>
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
