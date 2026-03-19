<script>
import axios from "axios";
import { RouterLink } from "vue-router";
import ShareButton from "../components/ShareButton.vue";

export default {
  components: {
    RouterLink,
    ShareButton,
  },
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
  <p id="title_nav">
    <RouterLink :to="{ name: 'home' }">Home </RouterLink>
    /Dictionary/
    <ShareButton />
  </p>
  <h1>Dictionary</h1>
  <p class="subtitle">You can translate words here</p>
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

  <div class="result-box">
    <p v-if="wordSearched">{{ inputText }} => {{ translatedWord }}</p>
    <p v-else-if="errorMsg">{{ errorMsg }}</p>
  </div>
</template>

<style lang="scss" scoped>
$color-1: #fdc921;
$color-2: #fdd85d;
$color-3: #fffdf5;
$color-4: #99d6ea;
$color-5: #6798c0;
h1 {
  font-weight: 500;
  margin-bottom: 20px;
  color: #fffdf5;
  margin-top: 10px;
  text-align: center;
}
.w-25 {
  width: 600px !important;
  margin: auto;
}
.result-box {
  background: $color-3;
  padding: 30px;
  border-radius: 20px;
  margin-top: 20px auto;
  width: 700px;
  margin: 40px auto;
  border: 6px solid #9aa2a9;
  font-weight: 600;
  font-style: normal;
  color: #010a19;
  min-height: 250px;
}
input {
  font-weight: bold;
}
.subtitle {
  text-align: center;
  color: #fffdf5;
  margin-bottom: 24px;
  font-size: 16px;
}
</style>
