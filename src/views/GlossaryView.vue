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
      svWord: "", //Är det som sparas i svaret från API
      errorMsg: "", //Texten spom visas om något går fel Börjar som null så inget visas först
      wordSearched: false,
      wordList: [],
    };
  },
  created() {
    JSON.parse(localStorage.getItem("wordlist"));
  },
  watch: {
    //håller koll på input fältet och döljer resultatet när texten suddas ut
    inputText(newVal, oldVal) {
      if (newVal.length < oldVal.length) {
        this.wordSearched = false;
      }
    },
    wordList: {
      handler() {
        localStorage.setItem("wordlist", JSON.stringify(this.wordList));
      },
      deep: true,
    },
  },

  methods: {
    async getEnglishWord() {
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
              langpair: "en|sv",
            },
          },
        );
        this.svWord = response.data.matches[0].translation; //Sparar resultatet i en variabel
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
        swedish: this.svWord,
      };
      //pushas in i en array och sparas till local storage
      this.wordList.push(newWord);
    },
  },
};
</script>

<template>
  <h1>Glossary</h1>
  <input v-model="inputText" placeholder="Skriv ett ord" />
  <BButton @click="getEnglishWord">Sök</BButton>
  <div v-if="wordSearched">
    <p>{{ inputText }} : {{ svWord }}</p>
    <BButton @click="addToList">Lägg till</BButton>
  </div>
  <p v-else-if="errorMsg">{{ errorMsg }}</p>

  <section>
    <ul>
      <li></li>
      <li></li>
      <BButton>Ta bort</BButton>
    </ul>
  </section>
</template>
