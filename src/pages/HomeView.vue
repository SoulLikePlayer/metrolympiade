<template>
  <div class="container homepage fade-in">
    <section class="hero">
      <h1>Bienvenue sur Metrolympiades</h1>
      <p>Gérez facilement vos événements de team building sportif.</p>
      <RouterLink to="/login" class="btn primary">Se connecter</RouterLink>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
@import "../assets/style/HomePage.css";
</style>
