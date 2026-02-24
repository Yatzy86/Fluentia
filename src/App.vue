<script setup>
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
  <div>
    <AppHeader />
    <h1>Vårat projekt</h1>
    <h2>Här är vi</h2>
    <RouterLink :to="{ name: 'game', params: { name: 'memory' } }"
      >Memory</RouterLink
    >
    <RouterLink :to="{ name: 'game', params: { name: 'choicequiz' } }"
      >Flervalsfrågor</RouterLink
    >

    <RouterView />
  </div>
</template>
