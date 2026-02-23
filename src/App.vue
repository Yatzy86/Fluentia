<script setup></script>

<template>
  <div>
    <h1>Vårat projekt</h1>
    <h2>Här är vi</h2>
    <RouterLink :to="{ name: 'game', params: { name: 'memory' } }"
      >Memory</RouterLink
    >

    <RouterView />
  </div>
</template>
