<template>
  <header class="header">
    <nav>
      <router-link to="/">Home</router-link>
      <template v-if="!isAuthenticated">
        <router-link to="/login">Se connecter</router-link>
        <router-link to="/register">Créer un compte</router-link>
      </template>
      <button v-else @click="handleLogout">Déconnexion</button>
    </nav>
  </header>
</template>

<script setup>
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";

const { isAuthenticated, logoutUser } = useAuth();
const router = useRouter();

const handleLogout = () => {
  logoutUser();
  router.push("/");
};
</script>
