<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <div>
    <AppHeader />

    <!-- visar HomeView. Spel länkar är inuti HomeView -->
    <RouterView> </RouterView>

    <AppFooter/>
  </div>
</template>