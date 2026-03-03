<script>
import axios from "axios";

export default {
  created() {
    // this.getEnglishWord();
  },
  data() {
    return {
      inputText: "", //Sträng som ska innehålla det användaren skriver i inputen
      // apiResult: null, //Är det som sparas i svaret från API
      // errorMsg: null, //Texten spom visas om något går fel Börjar som null så inget visas först
    };
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
          "https://freedictionaryapi.com/api/v1/entries/en/" + this.inputText,
          {
            translation: true,
          },
        );
        console.log(response.data);
        this.apiResult = response.data; //Sparar i state
      } catch (error) {
        this.errorMsg = "Kunde inte hämta ordet.";
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <h1>Glossary</h1>
  <input v-model="inputText" placeholder="Skriv ett ord" />
  <button @click="getEnglishWord">Sök</button>
  <p v-if="errorMsg">{{ errorMsg }}</p>
  <p v-if="apiResult">{{ apiResult.entries[0].senses[0].definition }}</p>

  <!-- <div v-for="syn in apiResult.entries">
    {{ syn }}
  </div> -->
  <!-- <ol>
    <li v-for="word in englishWord">{{ word }}</li>
  </ol> -->
</template>
