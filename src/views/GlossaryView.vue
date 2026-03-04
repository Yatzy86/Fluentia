<!-- ATT GÖRA:
Skriv ut wordlist på sidan med v-for
Lägg till ta bort knapp
Se till så att sidan uppdateras automatiskt
Styla
Kommentera -->

<script>
import axios from "axios";

export default {
  data() {
    return {
      inputText: "", //Sträng som ska innehålla det användaren skriver i inputen
      translatedWord: "", //Är det som sparas i svaret från API
      errorMsg: "", //Texten spom visas om något går fel Börjar som null så inget visas först
      wordSearched: false,
      wordList: [],
      setLang: "en|sv",
      placeholderText: "Search English - Swedish",
    };
  },
  created() {
    //laddar in listan från localstorage och lägger den i wordList
    this.wordList = JSON.parse(localStorage.getItem("wordlist"));
  },
  watch: {
    //håller koll på input fältet och döljer resultatet när texten suddas ut
    inputText(newVal, oldVal) {
      if (newVal.length < oldVal.length) {
        this.wordSearched = false;
      }
    },
    //håller koll på om wordlist ändras och sparar då in den nya listan i localstorage
    wordList: {
      handler() {
        localStorage.setItem("wordlist", JSON.stringify(this.wordList));
      },
      deep: true,
    },
  },

  methods: {
    async getTranslatedWord() {
      //Async använder await och väntar på API svar
      //Funktionen körs när du klickar på knappen
      try {
        //try: Kod som kan misslyckas pga nätverk, fel URL eller ord som inte finns

        const response = await axios.get(
          //await axios.get skickar en GET request till API:t
          //URL:en byggs med this.inputText
          `https://api.mymemory.translated.net/get?`,
          {
            params: {
              q: this.inputText,
              langpair: this.setLang,
            },
          },
        );
        this.translatedWord = response.data.matches[0].translation; //Sparar resultatet i en variabel
        this.wordSearched = true; //Gör så att resultatet visas med v-if
      } catch (error) {
        this.errorMsg = "Kunde inte hämta ordet.";
        console.error(error);
      }
    },
    //när knappen "lägg till klickas på körs funktionen"
    addToList() {
      //skapar ett nytt objekt med vald info
      const newWord = {
        id: crypto.randomUUID(),
        english: this.inputText,
        swedish: this.translatedWord,
      };
      //pushas in i en array och sparas till local storage
      this.wordList.push(newWord);
    },
    //funktion för att ta bort ord.
    removeWord(word) {
      this.wordList.splice(this.wordList.indexOf(word), 1); //tar bort 1 object från index av word i arrayen wordList
    },
    switchLang() {
      if (this.setLang === "en|sv") {
        this.setLang = "sv|en";
        this.placeholderText = "Search Swedish - English ";
        this.inputText = "";
      } else {
        this.setLang = "en|sv";
        this.placeholderText = "Search English - Swedish";
        this.inputText = "";
      }
    },
  },
};
</script>

<template>
  <h1>Glossary</h1>
  <div class="w-25">
    <b-input-group>
      <b-form-input
        v-model="inputText"
        type="text"
        :placeholder="placeholderText"
      ></b-form-input>

      <b-input-group-append class="d-flex">
        <b-input-group-text>
          <i @click="switchLang" class="bi bi-arrow-left-right"></i>
        </b-input-group-text>
        <b-button @click="getTranslatedWord" variant="third"
          >Search for word</b-button
        >
      </b-input-group-append>
    </b-input-group>
  </div>

  <div v-if="wordSearched">
    <p>{{ inputText }} : {{ translatedWord }}</p>
    <BButton @click="addToList">Add to list</BButton>
  </div>
  <p v-else-if="errorMsg">{{ errorMsg }}</p>

  <section>
    <ul v-for="word in wordList" :key="word.id">
      <li>{{ word.english }}</li>
      <li>{{ word.swedish }}</li>
      <BButton @click="removeWord(word)">Remove from list</BButton>
    </ul>
  </section>
</template>
