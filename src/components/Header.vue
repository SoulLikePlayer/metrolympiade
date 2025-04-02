<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/" class="nav-link">Accueil</RouterLink>
      <RouterLink to="/login" class="nav-link">Connexion</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
@import "../assets/style/Header.css";
</style>
