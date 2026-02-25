<script setup>
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div>
    <AppHeader />

    <!-- visar HomeView. Spel länkar är inuti HomeView -->
    <RouterView> </RouterView>
  </div>
</template>
