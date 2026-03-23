<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

const showInstructions = ref(true);
const router = useRouter();

function closeInstructions() {
  showInstructions.value = false;
}
function goBackHome() {
  router.push("/");
}

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

  //Om nuvarande frågan(currentQuestion) är lika mycket som den valda frågans längd.
  //Då är spelet slut, vid andra ord endGame är true.
  if (currentQuestion.value === chosenQuestions.value.length) {
    endGame.value = true;
  }
};

//Genom att köra denna funktionen
//Så är endGame false det menas med att spelet startar
//currentQuestion.value är tillbaka till 0
//score är tillbaka till 0
//newGame är sann så den kör igång
//startGame() kör igång så den startar ett nytt spel

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
  <BModal
    v-model="showInstructions"
    ok-title="Got it"
    title="Instructions!"
    cancel-title="Go Back"
    @cancel="goBackHome"
    @ok="closeInstructions"
    no-close-on-backdrop
    no-close-on-esc
    no-header-close
  >
    <div class="instructions-box">
      <p>1. Read the captions carefully.</p>
      <p>2. Choose the correct answer from the options .</p>
      <p>3. Select only one answer per question.</p>
      <p>4. Review your answers before submitting.</p>
      <p>5. Good luck!!</p>
    </div>
  </BModal>

  <!-- <div class="card" v-if="chosenQuestions.length > 0"> -->
  <main class="game">
    <h1>Choice Quiz</h1>
    <!-- Om den valda frågans längd är högre eller om den nuvarande frågan är lägre än de valda frågornas längd -->
    <!-- Då ska nedanstående section class quiz visas -->
    <section
      class="quiz"
      v-if="
        chosenQuestions.length > 0 && currentQuestion < chosenQuestions.length
      "
    >
      <!-- Denna visas om endGame är falskt, vid andra ord ifall spelet är igång -->

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
        <!-- Denna loopen går in i answered, fångar in alternativen och lägger i alt,
         sedan blandas alternativen med math random.
         Med :key"alt.id" så skapar den ett unikt id -->

        <ul
          v-for="alt in answered
            ? chosenQuestions[currentQuestion].alternative
            : chosenQuestions[currentQuestion].alternative.sort(
                () => Math.random() - 0.5,
              )"
          :key="alt.id"
        >
          <!-- Här ligger altButton klassen, vid andra ord de alternativen som kommer i form av knappar -->

          <!-- Detta gör att när du klickar på altButton så blir den grön ifall du svarar rätt,
          och röd ifall du svarar fel. Ifall du svarar fel så ser du även det rätta alternativet i grön färg.
          Den kollar ditt svar med hjälp av checkAnswer funktionen -->

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
        <!-- Knappen blir aktiv när du svarat på ett utav alternativen -->
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

      <!-- Denna knappen startar ett helt nytt spel -->
      <button class="newGameButton" @click="startNewGame()">New Game</button>
    </section>
  </main>
</template>
<style lang="scss" scoped>
* {
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

$color-1: #fdc921;
$color-2: #fdd85d;
$color-3: #fffdf5;
$color-4: #99d6ea;
$color-5: #6798c0;

//Instruktioner för spelet

:deep(.modal-title) {
  font-weight: 800;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.78);
  text-transform: uppercase;
}

:deep(.modal-header) {
  background: $color-1;
  text-align: center;
  border-bottom: 3px solid $color-5;
  padding: 14px 16px;
}
:deep(.modal-content) {
  border-radius: 14px;
  border: 2px solid $color-4;
  background-color: $color-3;
  overflow: hidden;
}
.instructions-box {
  background: $color-3;
  padding: 16px;
  border-radius: 12px;
  border: 2px dashed $color-4;
  position: relative;
}
.instructions-box p {
  background: $color-2;
  padding: 8px 12px;
  border-radius: 8px;
  margin: 8px 0;
  border-left: 4px solid $color-4;
  font-weight: 500;
}

//Stylingen för spelet

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
}

//Rubriken

h1 {
  color: #fff;
}

//Spelet

.quiz {
  background-color: #4177c3;
  padding: 1rem;
  width: 100%;
  max-width: 640px;
  border-radius: 1rem;
}

//Informationen, poäng och vilken fråga du är på

.quizInfo {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

//Frågan

.question {
  color: #fff;
  font-size: 1.25rem;
}

//Poäng

.score {
  color: #fff;
  font-size: 1.25rem;
  text-align: center;
}

//Rutan som innehåller frågan och alternativen

.options {
  padding: 1rem;
  display: block;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
}

//Rubriken för frågan

h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #fff;
}

//Stylingen kring vilket ord som ska översättas

.questionWord {
  color: #e7c558;
  font-weight: 1rem;
}

//Alternativsknappen

.altButton {
  padding: 1rem;
  border-radius: 1rem;
}

//Vad som händer när du låter musen cirkulera över knappen

.altButton:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}

//"Nästa Fråga"-knappen

.nextQuestion {
  padding: 1rem;
  border-radius: 1rem;
  font-weight: bold;
}

//Detta händer när spelet slutar

//Rutan som kommer när du avslutar spelet
.quizEnd {
  background-color: #4177c3;
  padding: 1rem;
  width: 100%;
  max-width: 640px;
  border-radius: 1rem;
}

//Rubriken

.quizEnd h2 {
  text-align: center;
}

//"Nytt spel" knappen

.newGameButton {
  display: flex;
  padding: 0.5rem;
  background-color: #e7c558;
  border-radius: 0.5rem;
  margin: auto;
}

//Mobilbrytpunkt som ändrar storlek på score(poäng) och question(fråga)

@media (max-width: 380px) {
  .question {
    font-size: 1rem;
  }
  .score {
    font-size: 1rem;
  }
}
</style>
