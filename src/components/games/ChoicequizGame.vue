<script setup>
import { ref } from "vue";

//Här skapas en variabel för frågor som ska visas

//Den valda frågan
const chosenQuestions = ref([]);

//Nuvarande frågan
const currentQuestion = ref(0);

//Poäng
const score = ref(0);

//Slut på spelet
const endGame = ref(false);

//Svar
const answered = ref(false);

//Nytt spel
const newGame = ref(false);

//Det nuvarande valda svaret
const currentChosenAnswer = ref(null);

//Frågorna i i objekt som ligger i nycklarna question, alternative och rightAnswer
const questions = ref([
  {
    question: "Dog?",
    alternative: ["Katt", "Fisk", "Fågel", "Hund"],
    rightAnswer: "Hund",
  },
  {
    question: "Apple?",
    alternative: ["Banan", "Äpple", "Päron", "Apelsin"],
    rightAnswer: "Äpple",
  },
  {
    question: "Parrot?",
    alternative: ["Örn", "Mås", "Papegoja", "Sparv"],
    rightAnswer: "Papegoja",
  },
  {
    question: "Bottle?",
    alternative: ["Flaska", "Burk", "Stol", "Matta"],
    rightAnswer: "Flaska",
  },
  {
    question: "Book?",
    alternative: ["Säng", "Bok", "Kruka", "Dörr"],
    rightAnswer: "Bok",
  },
  {
    question: "Food?",
    alternative: ["Dricka", "Mat", "Påse", "Tavla"],
    rightAnswer: "Mat",
  },
  {
    question: "Pillow?",
    alternative: ["Äta", "Vatten", "Täcke", "Kudde"],
    rightAnswer: "Kudde",
  },
  {
    question: "Chair?",
    alternative: ["Tak", "Säng", "Stol", "Tallrik"],
    rightAnswer: "Stol",
  },
  {
    question: "Water?",
    alternative: ["Mjölk", "Vatten", "Bröd", "Salt"],
    rightAnswer: "Vatten",
  },
  {
    question: "Bread?",
    alternative: ["Kött", "Ris", "Bröd", "Potatis"],
    rightAnswer: "Bröd",
  },
  {
    question: "Window?",
    alternative: ["Dörr", "Fönster", "Golvlampa", "Tak"],
    rightAnswer: "Fönster",
  },
  {
    question: "Table?",
    alternative: ["Bord", "Soffa", "Spegel", "Stol"],
    rightAnswer: "Bord",
  },
  {
    question: "Cat?",
    alternative: ["Katt", "Fågel", "Kanin", "Ko"],
    rightAnswer: "Katt",
  },
  {
    question: "School?",
    alternative: ["Skola", "Arbete", "Bibliotek", "Klassrum"],
    rightAnswer: "Skola",
  },
  {
    question: "Teacher?",
    alternative: ["Elev", "Rektor", "Lärare", "Vaktmästare"],
    rightAnswer: "Lärare",
  },
  {
    question: "Car?",
    alternative: ["Buss", "Cykel", "Bil", "Tåg"],
    rightAnswer: "Bil",
  },
  {
    question: "House?",
    alternative: ["Villa", "Hus", "Lägenhet", "Stuga"],
    rightAnswer: "Hus",
  },
  {
    question: "Sun?",
    alternative: ["Stjärna", "Måne", "Moln", "Sol"],
    rightAnswer: "Sol",
  },
  {
    question: "Moon?",
    alternative: ["Sol", "Moln", "Måne", "Himmel"],
    rightAnswer: "Måne",
  },
  {
    question: "Shirt?",
    alternative: ["Hatt", "Jacka", "Tröja", "Skjorta"],
    rightAnswer: "Skjorta",
  },
]);

//Denna funktionen blandar frågorna.
//De tre punkterna är en "spread operator". Den gör en kopia av questions.value arrayen.
//sort sorterar och Math.random ger tillbaka ett slumpmässigt tal mellan -0,5 och 0,5
//Detta sparas i shuffleQuestions.
const startGame = () => {
  const shuffleQuestions = [...questions.value].sort(() => Math.random() - 0.5);

  //chosenQuestions.value fångar upp det som sparats i shuffleQuestions. slice(0,10) gör att den slumpar 10 frågor.
  chosenQuestions.value = shuffleQuestions.slice(0, 10);
};

//checkAnswer ökar poängen ifall det valda svaret är rätt.
const checkAnswer = (chosenAnswer) => {
  if (
    chosenQuestions.value[currentQuestion.value].rightAnswer === chosenAnswer
  ) {
    score.value++;
  }
  answered.value = true;

  //Här läggs chosenAnswer in i currentChosenAnswer.value
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
    <section
      class="quiz"
      v-if="
        chosenQuestions.length > 0 && currentQuestion < chosenQuestions.length
      "
    >
      <div class="quizInfo" v-if="!endGame">
        <p class="question">
          Question: {{ currentQuestion + 1 }} of
          {{ chosenQuestions.length }}
        </p>
        <p class="score">Score: {{ score }} / {{ chosenQuestions.length }}</p>
      </div>

      <div class="options">
        <h2>
          What is the translation of
          <span class="questionWord">{{
            chosenQuestions[currentQuestion].question
          }}</span>
        </h2>

        <ul
          v-for="alt in answered
            ? chosenQuestions[currentQuestion].alternative
            : chosenQuestions[currentQuestion].alternative.sort(
                () => Math.random() - 0.5,
              )"
          :key="alt.id"
        >
          <div class="d-grid gap-1">
            <button
              class="btn btn-primary altButton"
              type="button"
              :disabled="answered"
              :style="{
                backgroundColor:
                  answered &&
                  chosenQuestions[currentQuestion]?.rightAnswer === alt
                    ? 'green'
                    : currentChosenAnswer === alt
                      ? 'red'
                      : '',
              }"
              @click="checkAnswer(alt)"
            >
              {{ alt }}
            </button>
          </div>
        </ul>
      </div>
      <div class="d-grid gap-1">
        <button
          class="btn btn-third nextQuestion"
          :disabled="!answered"
          @click="nextQuest()"
        >
          Next
        </button>
      </div>
    </section>
    <!-- Detta händer när spelet är slut -->

    <section class="quizEnd" v-else>
      <h2>Game over</h2>
      <p class="score">
        Your total score {{ score }} / {{ chosenQuestions.length }}
      </p>
      <button class="newGameButton" @click="startNewGame()">New Game</button>
    </section>
  </main>
</template>
<style scoped>
* {
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
  color: #fff;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #fff;
}

.questionWord {
  color: #e7c558;
  font-weight:;
}

.altButton {
  padding: 1rem;
  border-radius: 1rem;
}

.nextQuestion {
  padding: 1rem;
  border-radius: 1rem;
  font-weight: bold;
}

.altButton:hover {
  transform: translateY(-2px);
  opacity: 0.95;
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
  /* background-color: #214373; */
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
}

.quizEnd {
  background-color: #4177c3;
  padding: 1rem;
  width: 100%;
  max-width: 640px;
  border-radius: 1rem;
}

.quizEnd h2 {
  text-align: center;
}

.score {
  color: #fff;
  font-size: 1.25rem;
  text-align: center;
}

.newGameButton {
  display: flex;
  padding: 0.5rem;
  background-color: #e7c558;
  border-radius: 0.5rem;
  margin: auto;
}

@media (max-width: 380px) {
  .quizInfo .question {
    font-size: 1rem;
  }
  .quizInfo .score {
    font-size: 1rem;
  }
}
</style>
