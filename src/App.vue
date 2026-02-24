<<<<<<< HEAD
<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import AppHeader from "./components/AppHeader.vue";
import "./assets/style.scss";
</script>
=======
<script setup></script>
>>>>>>> d2fe403a2c914e6d3359dda5fd5a7f33510a4625

<template>
  <div>
    <AppHeader />
    <RouterView />
    <h1>Vårat projekt</h1>
    <h2>Här är vi</h2>
    <RouterLink :to="{ name: 'game', params: { name: 'memory' } }"
      >Memory</RouterLink
    >

    <RouterView />
  </div>
</template>
