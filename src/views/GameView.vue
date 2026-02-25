<script setup>
import { computed, defineAsyncComponent } from "vue";

//sparar routerlink propsen i ett props variabel objekt
//"name" blir namnet för propsen som man skickade in med routerlink
const props = defineProps(["name"]);

//gör import på alla spelen och sparar i variabel
//defineAsyncComponent gör så att import kan göras i en variabel eller funktion osv.
const memoryGame = defineAsyncComponent(
  () => import("../components/games/MemoryGame.vue"),
);
const choicequizGame = defineAsyncComponent(
  () => import("../components/games/ChoicequizGame.vue"),
);
const hangmanGame = defineAsyncComponent(
  () => import("../components/games/HangmanGame.vue"),
);
const wordsearchGame = defineAsyncComponent(
  () => import("../components/games/WordsearchGame.vue"),
);

//laddar spel beroende på vilken prop som skickas in med routerlink
const currentGame = computed(() => {
  if (props.name === "memory") {
    return memoryGame;
  } else if (props.name === "choicequiz") {
    return choicequizGame;
  } else if (props.name === "hangman") {
    return hangmanGame;
  } else if (props.name === "wordsearch") {
    return wordsearchGame;
  } else {
    return "Couldn't find game.";
  }
});
</script>

<template>
  <!-- laddar komponenten beroende på vad variabeln currentGame blir -->
  <component :is="currentGame" />
</template>
