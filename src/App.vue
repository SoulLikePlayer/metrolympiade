<template>
  <div id="app" class="layout">
    <aside class="sidebar" :class="{ 'collapsed': sidebarCollapsed }">
      <Header />
    </aside>

    <div
      class="toggle-sidebar"
      @click="toggleSidebar"
      :class="{ 'collapsed': sidebarCollapsed }"
    >
      <i :class="sidebarCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i>
    </div>

    <div class="content-wrapper" :class="{ 'expanded': sidebarCollapsed }">
      <main class="main-content">
        <RouterView />
      </main>
      <Footer />
    </div>
  </div>
</template>


<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { ref } from 'vue';

import "./assets/style/App.css"

const sidebarCollapsed = ref(false);

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};
</script>

