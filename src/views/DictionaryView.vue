<script>
import axios from "axios";

export default {
  data() {
    return {
      inputText: "", //Sträng som ska innehålla det användaren skriver i inputen
      translatedWord: "", //Är det som sparas i svaret från API
      errorMsg: "", //Texten spom visas om något går fel Börjar som null så inget visas först
      wordSearched: false,
      setLang: "en|sv",
      placeholderText: "Search English - Swedish",
    };
  },
  watch: {
    //håller koll på input fältet och döljer resultatet när texten suddas ut
    inputText(newVal, oldVal) {
      if (newVal.length < oldVal.length) {
        this.wordSearched = false;
        this.errorMsg = "";
      }
    },
  },

  methods: {
    async getTranslatedWord() {
      //Async använder await och väntar på API svar
      //Funktionen körs när du klickar på knappen
      try {
        //try: Kod som kan misslyckas pga nätverk, fel URL eller ord som inte finns
        this.errorMsg = "";
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
    switchLang() {
      if (this.setLang === "en|sv") {
        this.setLang = "sv|en";
        this.placeholderText = "Search Swedish - English ";
      } else {
        this.setLang = "en|sv";
        this.placeholderText = "Search English - Swedish";
      }
      this.inputText = "";
      this.translatedWord = "";
      this.wordSearched = false;
      this.errorMsg = "";
    },
  },
};
</script>

<template>
  <h1>Dictionary</h1>
  <div class="w-25">
    <b-input-group>
      <b-form-input
        v-model="inputText"
        type="text"
        :placeholder="placeholderText"
        @keyup.enter="getTranslatedWord"
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
  </div>
  <p v-else-if="errorMsg">{{ errorMsg }}</p>
</template>
