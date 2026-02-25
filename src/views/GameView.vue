<script setup>
import { computed, defineAsyncComponent } from "vue";
const props = defineProps(["name"]);
//gör egen variabel för att ladda in spel
//lägg till alla spel
const memoryGame = defineAsyncComponent(
  () => import("../components/MemoryGame.vue"),
);
const choicequizGame = "";

const currentGame = computed(() => {
  if (props.name === "memory") {
    return memoryGame;
  } else if (props.name === "choicequiz") {
    return choicequizGame;
  } else {
    return "Couldn't find game.";
  }
});
</script>

<template>
  <component :is="currentGame" />
  <h1>Spelsida</h1>
</template>
