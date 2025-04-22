<template>
  <div id="app" class="layout">
    <aside class="sidebar" :class="{ 'collapsed': sidebarCollapsed, 'mobile': isMobile }">
      <Header />
    </aside>

    <div
      class="toggle-sidebar"
      @click="toggleSidebar"
      :class="{ 'collapsed': sidebarCollapsed, 'mobile': isMobile }"
    >
      <i :class="sidebarCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i>
    </div>

    <div 
      class="content-wrapper" 
      :class="{ 'expanded': sidebarCollapsed, 'mobile': isMobile }" 
      @click="handleContentClick"
    >
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
import { ref, onMounted, onBeforeUnmount } from 'vue';

import "./assets/style/App.css"

const sidebarCollapsed = ref(false);
const isMobile = ref(window.innerWidth <= 768);

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const handleContentClick = () => {
  if (isMobile.value && !sidebarCollapsed.value) {
    sidebarCollapsed.value = true;
  }
};

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
  if (isMobile.value) {
    sidebarCollapsed.value = true;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>