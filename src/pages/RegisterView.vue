<template>
  <div class="auth-container register-style">
    <h2>Inscription</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-control">
        <input v-model="username" type="text" required placeholder=" " />
        <label>
          <span v-for="(char, i) in `Nom d'utilisateur`" :key="i" :style="{ transitionDelay: `${i * 50}ms` }">{{ char }}</span>
        </label>
      </div>

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

      <div class="form-control">
        <input v-model="teamName" type="text" required placeholder=" " />
        <label>
          <span v-for="(char, i) in `Nom de l'équipe`" :key="i" :style="{ transitionDelay: `${i * 50}ms` }">{{ char }}</span>
        </label>
      </div>

     <button class="submit-btn" type="submit">Enregistrer mon équipe</button>
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
