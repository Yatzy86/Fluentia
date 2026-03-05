<script setup>
import { computed, defineAsyncComponent, ref } from "vue";
import { RouterLink } from "vue-router";

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

//GLOSSARY

import AddToGlossary from "../components/AddToGlossary.vue";
//länkar variabel till v-model
let addedWord = ref("");

//När knappen trycks på så blir addedWord samma som searchedWord
// addedWord skrivs sedan ut längre ner på sidan
function addWord(newWord) {
  console.log(newWord);
  //laddar in listan från localstorage och lägger den i wordList
  let wordList = ref(JSON.parse(localStorage.getItem("wordlist")) || []);
  //unshift pushar in i en array(fast först i listan)
  wordList.value.unshift(newWord);
  localStorage.setItem("wordlist", JSON.stringify(wordList.value));
  console.log(wordList);
  addedWord.value = newWord;
  console.log(addedWord.value.length);
}
</script>

<template>
  <article>
    <!-- länk till homeview -->
    <section>
      <p id="title_nav">
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        / {{ props.name }}
      </p>
    </section>

    <!-- laddar komponenten beroende på vad variabeln currentGame blir -->
    <component :is="currentGame" />

    <!-- add to glossary sektion -->
    <section id="add_glossary">
      <b-card variant="secondary" title="Add to Glossary">
        <b-card-text v-if="addedWord" class="text-fourth"
          >You have added
          <span class="h5" style="color: rgb(107, 255, 107)"
            >{{ addedWord.word }} : {{ addedWord.translation }}</span
          >
          to the Glossary!</b-card-text
        >
        <b-card-text> <AddToGlossary @word-added="addWord" /></b-card-text>

        <RouterLink to="/glossary" class="card-link">
          Explore your Glossary>
        </RouterLink>
      </b-card>
    </section>
  </article>
</template>
