<script setup>
import { computed, defineAsyncComponent } from "vue";
const props = defineProps(["name"]);
//gör egen variabel för att ladda in spel
//lägg till alla spel

const currentGame = computed(() => {
  if (props.name === "memory") {
    return defineAsyncComponent(() => import("../components/Memory.vue"));
  }
});
</script>

<template>
  <component :is="currentGame" />
  <h1>Spelsida</h1>
</template>
