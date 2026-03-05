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
      date: new Date(),
    };
  },

  watch: {
    //håller koll på input fältet och döljer resultatet när texten suddas ut
    inputText(newVal, oldVal) {
      if (newVal.length < oldVal.length) {
        this.wordSearched = false;
      }
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
        word: this.inputText,
        translation: this.translatedWord,
        date: this.date.toDateString(),
      };

      this.inputText = "";
      this.$emit("word-added", newWord);
      this.wordSearched = false;
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
  <div>
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

  <div
    v-if="wordSearched"
    class="d-flex gap-2 align-items-center justify-content-around mt-3 bg-primary p-2 rounded"
  >
    <p class="mb-0 h5 text-fourth">{{ inputText }}</p>
    <p class="mb-0 h5 text-fourth">{{ translatedWord }}</p>
    <BButton @click="addToList" variant="third">Add to list</BButton>
  </div>
  <p v-else-if="errorMsg">{{ errorMsg }}</p>
</template>
