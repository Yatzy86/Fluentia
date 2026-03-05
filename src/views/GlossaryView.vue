<!-- ATT GÖRA:
Styla
Kommentera GlossaryView, Add -->

<script setup>
import AddToGlossary from "../components/AddToGlossary.vue";
import { ref } from "vue";

//laddar in listan från localstorage och lägger den i wordList
let wordList = ref(JSON.parse(localStorage.getItem("wordlist")) || []);

function addWord(newWord) {
  //unshift pushar in i en array(fast först i listan)
  wordList.value.unshift(newWord);
  localStorage.setItem("wordlist", JSON.stringify(wordList.value));
}

//funktion för att ta bort ord.
function removeWord(word) {
  wordList.value.splice(wordList.value.indexOf(word), 1); //tar bort 1 object från index av word i arrayen wordList
  localStorage.setItem("wordlist", JSON.stringify(wordList.value));
}
</script>

<template>
  <h1>Glossary</h1>
  <section id="glossary-section">
    <AddToGlossary @word-added="addWord" />

    <div>
      <ul v-for="word in wordList" :key="word.id">
        <li>{{ word.english }}</li>
        <li>{{ word.swedish }}</li>
        <BButton @click="removeWord(word)">Remove from list</BButton>
      </ul>
    </div>
  </section>
</template>
