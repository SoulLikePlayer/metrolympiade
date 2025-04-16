<template>
  <div id="app" class="layout">
    <div class="toggle-sidebar" @click="toggleSidebar">
      <i :class="sidebarCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i>
    </div>
    <aside class="sidebar" :class="{ 'collapsed': sidebarCollapsed }">
      <Header />
    </aside>

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

const sidebarCollapsed = ref(false);

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.toggle-sidebar {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: left 0.3s ease;
}

.toggle-sidebar:hover {
  background-color: #e8e8e8;
}

.sidebar {
  width: 20%;
  min-width: 280px;
  background-color: #f8f8f8;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid #ddd;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  transition: transform 0.3s ease, width 0.3s ease;
}

.sidebar.collapsed {
  transform: translateX(-100%);
  width: 0;
  min-width: 0;
}

.content-wrapper {
  width: 80%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  transition: width 0.3s ease;
}

.content-wrapper.expanded {
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 40px;
  overflow-x: auto;
  width: 100%;
  box-sizing: border-box;
}

footer {
  padding: 10px;
  text-align: center;
  background-color: #f1f1f1;
  border-top: 1px solid #ddd;
}
</style>