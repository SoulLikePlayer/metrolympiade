<template>
  <div class="auth-container register-style">
    <h2>Inscription</h2>
    <form @submit.prevent="handleRegister">
      <div class="wave-group">
        <input v-model="username" type="text" required class="input" placeholder=" " />
        <label class="label">
          <span v-for="(char, i) in `Nom d'utilisateur`.split('')" :key="i" class="label-char" :style="{ '--index': i }">
            {{ char === ' ' ? '\u00A0' : char }}
          </span>
        </label>
        <span class="bar"></span>
      </div>

      <div class="wave-group">
        <input v-model="email" type="email" required class="input" placeholder=" " />
        <label class="label">
          <span v-for="(char, i) in 'Email'.split('')" :key="i" class="label-char" :style="{ '--index': i }">
            {{ char }}
          </span>
        </label>
        <span class="bar"></span>
      </div>

      <div class="wave-group">
        <input v-model="password" type="password" required class="input" placeholder=" " />
        <label class="label">
          <span v-for="(char, i) in 'Mot de passe'.split('')" :key="i" class="label-char" :style="{ '--index': i }">
            {{ char === ' ' ? '\u00A0' : char }}
          </span>
        </label>
        <span class="bar"></span>
      </div>

      <div class="wave-group">
        <input v-model="teamName" type="text" required class="input" placeholder=" " />
        <label class="label">
          <span v-for="(char, i) in `Nom de l'équipe`.split('')" :key="i" class="label-char" :style="{ '--index': i }">
            {{ char === ' ' ? '\u00A0' : char }}
          </span>
        </label>
        <span class="bar"></span>
      </div>

      <button type="submit">Créer un compte</button>
      <p class="link-text">
        Déjà un compte ?
        <router-link to="/login">Se connecter</router-link>
      </p>
    </form>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";
import "../assets/style/Auth.css";

const username = ref("");
const email = ref("");
const password = ref("");
const teamName = ref("");
const { registerUser } = useAuth();
const router = useRouter();

const handleRegister = () => {
  registerUser({ username: username.value, email: email.value, password: password.value, teamName: teamName.value }, (error, data) => {
    if (!error) router.push("/");
    else console.error("Erreur d'inscription", error);
  });
};
</script>
