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

//länkar variabel till v-model
let searchedWord = defineModel();
let addedWord = ref("");

//När knappen trycks på så blir addedWord samma som searchedWord
// addedWord skrivs sedan ut längre ner på sidan
function update() {
  addedWord.value = searchedWord.value;
}
</script>

<template>
  <article class="d-flex flex-column align-items-center">
    <!-- länk till homeview -->
    <section>
      <h1 id="title_nav">
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        / {{ props.name }}
      </h1>
    </section>

    <!-- laddar komponenten beroende på vad variabeln currentGame blir -->
    <component :is="currentGame" />

    <!-- add to glossary sektion -->
    <section id="add_glossary">
      <b-card variant="secondary" title="Add to Glossary">
        <b-card-text v-if="addedWord.length > 0"
          >You have added the word: {{ addedWord }}!</b-card-text
        >
        <b-card-text>
          <b-input-group class="mt-3">
            <b-form-input
              variant="fourth"
              v-model="searchedWord"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="third" @click="update">Button</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-card-text>

        <RouterLink to="/glossary" class="card-link">
          Explore your Glossary>
        </RouterLink>
      </b-card>
    </section>
  </article>
</template>
