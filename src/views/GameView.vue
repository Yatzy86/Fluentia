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
let addedWord = ref("");

//funktion som tar emot emit från AddToGlossary komponenten och pushar in den i arrayen wordlist
function addWord(newWord) {
  console.log(newWord);
  //laddar in nuvarande listan från localstorage och lägger den i wordList
  let wordList = ref(JSON.parse(localStorage.getItem("wordlist")) || []);
  //unshift pushar in i en array(fast som index 0)
  wordList.value.unshift(newWord);
  //laddar in listan i local storage
  localStorage.setItem("wordlist", JSON.stringify(wordList.value));
  //lägger till objektet newWord i en variabel
  addedWord.value = newWord;
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
        <!-- meddelande som visar att du har lagt till objektet i listan -->
        <b-card-text v-if="addedWord" class="text-fourth"
          >You have added
          <span class="h5" style="color: rgb(107, 255, 107)"
            >{{ addedWord.word }} : {{ addedWord.translation }}</span
          >
          to the Glossary!</b-card-text
        >
        <!-- sök och lägg till komponent. Skickar ut objektet som ska läggas till -->
        <b-card-text> <AddToGlossary @word-added="addWord" /></b-card-text>

        <!-- länk till din glossida -->
        <RouterLink to="/glossary" class="card-link">
          Explore your Glossary>
        </RouterLink>
      </b-card>
    </section>
  </article>
</template>
