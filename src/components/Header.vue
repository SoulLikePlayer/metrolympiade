<template>
  <header class="header">
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/ranking">Classement</router-link>
      
      <template v-if="!isAuthenticated">
        <router-link to="/login">Connexion</router-link>
        <router-link to="/register">Inscription</router-link>
      </template>
      
      <template v-else>
        <div class="dropdown">
          <button class="dropdown-toggle">Mon compte</button>
          <div class="dropdown-menu">
            <router-link to="/team">Mon équipe</router-link>
            <router-link to="/games">Mes matchs</router-link>
            <button @click="handleLogout" class="btn-logout">Déconnexion</button>
          </div>
        </div>
      </template>
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

<style scoped src="../assets/style/Header.css"></style>