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
  <section
    id="glossary-section"
    class="bg-secondary rounded shadow d-flex flex-column justify-content-center align-items-center gap-3 w-75 m-auto mb-5 mt-1 pt-4 pb-3"
  >
    <div class="w-50">
      <AddToGlossary @word-added="addWord" />
    </div>
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Words</th>
            <th scope="col">Translations</th>
            <th scope="col">Date added</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="word in wordList" :key="word.id">
            <td>{{ word.word }}</td>
            <td>{{ word.translation }}</td>
            <td>{{ word.date }}</td>
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
</template>
