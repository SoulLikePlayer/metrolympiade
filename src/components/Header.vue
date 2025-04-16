<template>
    <nav class="header">
      <div class="logo" @click="router.push('/')">
        <span class="logo-text">Metrolympiades</span>
        <span class="logo-icon"><i class="fa-solid fa-futbol"></i></span>
      </div>

      <div class="nav-links">
        <router-link to="/" class="nav-link" exact-active-class="active">
          <span class="link-icon"><i class="fa-solid fa-house"></i></span>
          <span class="link-text">Accueil</span>
        </router-link>
        
        <router-link to="/leaderboard" class="nav-link" exact-active-class="active">
          <span class="link-icon"><i class="fa-solid fa-trophy"></i></span>
          <span class="link-text">Classement</span>
        </router-link>

        <template v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link" exact-active-class="active">
            <span class="link-icon"><i class="fa-solid fa-right-to-bracket"></i></span>
            <span class="link-text">Connexion</span>
          </router-link>
          
          <router-link to="/register" class="nav-link" exact-active-class="active">
            <span class="link-icon"><i class="fa-solid fa-pen"></i></span>
            <span class="link-text">Inscription</span>
          </router-link>
        </template>

        <template v-else>
          <div class="dropdown" @mouseenter="toggleDropdown(true)" @mouseleave="toggleDropdown(false)">
            <button class="dropdown-toggle">
              <span class="link-icon"><i class="fa-solid fa-user"></i></span>
              <span class="link-text">Mon compte</span>
              <span class="dropdown-arrow" :class="{ 'rotate': isDropdownOpen }">▼</span>
            </button>
            
            <transition name="dropdown">
              <div class="dropdown-menu" v-show="isDropdownOpen">
                <router-link to="/team" class="dropdown-item">
                  <span class="link-icon"><i class="fa-solid fa-users"></i></span>
                  <span class="link-text">Mon équipe</span>
                </router-link>
                
                <router-link to="/games" class="dropdown-item">
                  <span class="link-icon"><i class="fa-solid fa-calendar-days"></i></span>
                  <span class="link-text">Mes matchs</span>
                </router-link>
                
                <button @click="handleLogout" class="dropdown-item btn-logout">
                  <span class="link-icon"><i class="fa-solid fa-right-from-bracket"></i></span>
                  <span class="link-text">Déconnexion</span>
                </button>
              </div>
            </transition>
          </div>
        </template>
      </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";

const { isAuthenticated, logoutUser } = useAuth();
const router = useRouter();
const isDropdownOpen = ref(false);

const toggleDropdown = (state) => {
  isDropdownOpen.value = state;
};

const handleLogout = () => {
  logoutUser();
  router.push("/");
};
</script>

<style scoped src="../assets/style/Header.css"></style>