<script setup>
import AddToGlossary from "../components/AddToGlossary.vue";
import { ref } from "vue";

//laddar in listan från localstorage och lägger den i wordList
let wordList = ref(JSON.parse(localStorage.getItem("wordlist")) || []);

function addWord(newWord) {
  //unshift pushar in objektet newWord först i listan(index 0) i arrayen wordlist
  wordList.value.unshift(newWord);
  //sparar arrayen till local storage
  localStorage.setItem("wordlist", JSON.stringify(wordList.value));
}

//funktion för att ta bort ord.
function removeWord(word) {
  wordList.value.splice(wordList.value.indexOf(word), 1); //tar bort 1 object från index av word i arrayen wordList
  localStorage.setItem("wordlist", JSON.stringify(wordList.value)); //sparar sedan in i localstorage för att listan ska uppdateras
}
</script>

<template>
  <div id="background-div">
    <!-- link back to home  -->
    <p id="title-nav">
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      / Glossary
    </p>
    <h1 class="text-center mb-4 text-fourth fw-bold fs-2">Glossary</h1>

    <section
      id="glossary-section"
      class="bg-secondary rounded shadow d-flex flex-column justify-content-top align-items-center gap-3 w-75 m-auto mt-1 pt-4 pb-3"
    >
      <div class="input-width">
        <!-- component for searching after word and adding to list. Emits word-added with an object that will be added to the wordlist array -->
        <AddToGlossary @word-added="addWord" />
      </div>
      <div>
        <!-- table to write the words in the 'wordlist' glossary array -->
        <table class="table table-hover" per-page="5">
          <thead>
            <tr>
              <th scope="col">Words</th>
              <th scope="col">Translations</th>
              <th class="date-th" scope="col">Date added</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="word in wordList" :key="word.id">
              <td>{{ word.word }}</td>
              <td>{{ word.translation }}</td>
              <td class="date-td">{{ word.date }}</td>
              <td>
                <BButton variant="fourth"
                  ><i class="bi bi-trash3" @click="removeWord(word)"></i
                ></BButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
