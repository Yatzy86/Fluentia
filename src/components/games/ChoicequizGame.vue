<script setup>
import { ref } from "vue";

//Här skapas en variabel för frågor som ska visas

const chosenQuestions = ref([]);

const currentQuestion = ref(0);

const score = ref(0);

const endGame = ref(false);

const answered = ref(false);

const newGame = ref(false);

const currentChosenAnswer = ref(null);

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
  currentChosenAnswer.value = chosenAnswer;
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
  <!-- <div class="card" v-if="chosenQuestions.length > 0"> -->
  <main class="game">
    <h1>Choice Quiz</h1>
    <section class="quiz" v-if="chosenQuestions.length > 0">
      <div class="quizInfo" v-if="!endGame">
        <p class="question">
          Question: {{ currentQuestion }} of
          {{ chosenQuestions.length }}
        </p>
        <p class="score">Score: {{ score }} / {{ chosenQuestions.length }}</p>
      </div>

      <div class="options">
        <h2>
          {{ chosenQuestions[currentQuestion].question }}
        </h2>

        <ul
          v-for="alt in chosenQuestions[currentQuestion].alternative"
          :key="alt.id"
        >
          <button
            class="btn btn-primary"
            type="button"
            :disabled="answered"
            :style="{
              backgroundColor:
                // chosenQuestions &&
                // currentQuestion &&
                answered &&
                chosenQuestions[currentQuestion]?.rightAnswer === alt
                  ? 'green'
                  : '',
            }"
            @click="checkAnswer(alt)"
          >
            {{ alt }}
            <!-- {{
              // chosenQuestions &&
              // currentQuestion &&
              chosenQuestions[currentQuestion]?.rightAnswer
            }} -->
          </button>
        </ul>
      </div>
      <button
        class="btn btn-primary"
        :disabled="!answered"
        @click="nextQuest()"
      >
        Next
      </button>
    </section>
    <!-- Detta händer när spelet är slut -->

    <section v-else>
      <h2>Game over</h2>
      <p>Your total score {{ score }} / {{ chosenQuestions.length }}</p>
      <button @click="startNewGame()">New Game</button>
    </section>
  </main>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #fff;
}

.quiz {
  background-color: #4177c3;
  padding: 1rem;
  width: 100%;
  max-width: 640px;
  border-radius: 1rem;
}

.quizInfo {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.quizInfo .question {
  color: #fff;
  font-size: 1.25rem;
}

.quizInfo .score {
  color: #fff;
  font-size: 1.25rem;
}

.options {
  padding: 1rem;
  display: block;
  background-color: #214373;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
}
</style>
