<script setup>
import { ref } from "vue";

//Här skapas en variabel för frågor som ska visas

const chosenQuestions = ref([]);

const currentQuestion = ref(0);

const score = ref(0);

const endGame = ref(false);

const answered = ref(false);

const newGame = ref(false);

const questions = ref([
  {
    question: "What is the translation of Dog?",
    alternative: ["Katt", "Fisk", "Fågel", "Hund"],
    rightAnswer: "Hund",
  },
  {
    question: "What is the translation of Apple?",
    alternative: ["Banan", "Äpple", "Päron", "Apelsin"],
    rightAnswer: "Äpple",
  },
  {
    question: "What is the translation of Parrot?",
    alternative: ["Örn", "Mås", "Papegoja", "Sparv"],
    rightAnswer: "Papegoja",
  },
  {
    question: "What is the translation of Bottle?",
    alternative: ["Flaska", "Burk", "Stol", "Matta"],
    rightAnswer: "Flaska",
  },
  {
    question: "What is the translation of Book?",
    alternative: ["Säng", "Bok", "Kruka", "Dörr"],
    rightAnswer: "Bok",
  },
  {
    question: "What is the translation of Food?",
    alternative: ["Dricka", "Mat", "Påse", "Tavla"],
    rightAnswer: "Mat",
  },
  {
    question: "What is the translation of Pillow?",
    alternative: ["Äta", "Vatten", "Täcke", "Kudde"],
    rightAnswer: "Kudde",
  },
  {
    question: "What is the translation of Chair?",
    alternative: ["Tak", "Säng", "Stol", "Tallrik"],
    rightAnswer: "Stol",
  },
  {
    question: "What is the translation of Water?",
    alternative: ["Mjölk", "Vatten", "Bröd", "Salt"],
    rightAnswer: "Vatten",
  },
  {
    question: "What is the translation of Bread?",
    alternative: ["Kött", "Ris", "Bröd", "Potatis"],
    rightAnswer: "Bröd",
  },
  {
    question: "What is the translation of Window?",
    alternative: ["Dörr", "Fönster", "Golvlampa", "Tak"],
    rightAnswer: "Fönster",
  },
  {
    question: "What is the translation of Table?",
    alternative: ["Bord", "Soffa", "Spegel", "Stol"],
    rightAnswer: "Bord",
  },
  {
    question: "What is the translation of Cat?",
    alternative: ["Katt", "Fågel", "Kanin", "Ko"],
    rightAnswer: "Katt",
  },
  {
    question: "What is the translation of School?",
    alternative: ["Skola", "Arbete", "Bibliotek", "Klassrum"],
    rightAnswer: "Skola",
  },
  {
    question: "What is the translation of Teacher?",
    alternative: ["Elev", "Rektor", "Lärare", "Vaktmästare"],
    rightAnswer: "Lärare",
  },
  {
    question: "What is the translation of Car?",
    alternative: ["Buss", "Cykel", "Bil", "Tåg"],
    rightAnswer: "Bil",
  },
  {
    question: "What is the translation of House?",
    alternative: ["Villa", "Hus", "Lägenhet", "Stuga"],
    rightAnswer: "Hus",
  },
  {
    question: "What is the translation of Sun?",
    alternative: ["Stjärna", "Måne", "Moln", "Sol"],
    rightAnswer: "Sol",
  },
  {
    question: "What is the translation of Moon?",
    alternative: ["Sol", "Moln", "Måne", "Himmel"],
    rightAnswer: "Måne",
  },
  {
    question: "What is the translation of Shirt?",
    alternative: ["Hatt", "Jacka", "Tröja", "Skjorta"],
    rightAnswer: "Skjorta",
  },
]);

//Denna funktionen blandar och väljer 10 st
const startGame = () => {
  const shuffleWords = [...questions.value].sort(() => Math.random() - 0.5);
  chosenQuestions.value = shuffleWords.slice(0, 10);
};

const checkAnswer = (chosenAnswer) => {
  if (
    chosenQuestions.value[currentQuestion.value].rightAnswer === chosenAnswer
  ) {
    score.value++;
  }
  answered.value = true;
};

const nextQuest = () => {
  answered.value = false;
  currentQuestion.value++;
  if (currentQuestion.value === chosenQuestions.value.length) {
    endGame.value = true;
  }
};

const startNewGame = () => {
  endGame.value = false;
  currentQuestion.value = 0;
  score.value = 0;
  newGame.value = true;
  chosenQuestions.value = false;
  startGame();
};

startGame();
</script>

<template>
  <div v-if="chosenQuestions.length > 0">
    <h1>Choice Game</h1>
    <div v-if="!endGame">
      <p>Score: {{ score }} / {{ chosenQuestions.length }}</p>
      <h2>{{ chosenQuestions[currentQuestion].question }}</h2>

      <ul
        v-for="alt in chosenQuestions[currentQuestion].alternative"
        :key="alt.id"
      >
        <button :disabled="answered" @click="checkAnswer(alt)">
          {{ alt }}
        </button>
      </ul>

      <button :disabled="!answered" @click="nextQuest()">Next</button>
    </div>

    <div v-else>
      <h2>Game over</h2>
      <p>Your total score {{ score }} / {{ chosenQuestions.length }}</p>
      <button @click="startNewGame()">New Game</button>
    </div>
  </div>
</template>
