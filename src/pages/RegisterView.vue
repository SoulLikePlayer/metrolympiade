<template>
  <div class="auth-container">
    <h2>Inscription</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="username" type="text" placeholder="Nom d'utilisateur" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <input v-model="teamName" type="text" placeholder="Nom de l'équipe" required />
      <button type="submit">Créer un compte</button>
    </form>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";

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

