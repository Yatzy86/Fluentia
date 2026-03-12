<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

//INSTRUKTIONER
const showInstructions = ref(true);
const router = useRouter();

function closeInstructions() {
  showInstructions.value = false;
  playGame();
}
function goBackHome() {
  router.push("/");
}

//BILDER
const imgSrc = [
  "/src/assets/img/hangman/hangman01.jpg",
  "/src/assets/img/hangman/hangman02.gif",
  "/src/assets/img/hangman/hangman03.jpg",
  "/src/assets/img/hangman/hangman04.gif",
  "/src/assets/img/hangman/hangman05.jpg",
  "/src/assets/img/hangman/hangman06.gif",
  "/src/assets/img/hangman/hangman07.jpg",
  "/src/assets/img/hangman/hangman08.gif",
  "/src/assets/img/hangman/hangman09.jpg",
  "/src/assets/img/hangman/hangman10.gif",
  "/src/assets/img/hangman/hangman11.jpg",
  "/src/assets/img/hangman/hangman12.gif",
  "/src/assets/img/hangman/hangman13.jpg",
  "/src/assets/img/hangman/hangman14.gif",
  "/src/assets/img/hangman/hangman15.jpg",
  "/src/assets/img/hangman/hangman16.gif",
  "/src/assets/img/hangman/hangman17.jpg",
  "/src/assets/img/hangman/hangman18.gif",
  "/src/assets/img/hangman/hangman19.jpg",
  "/src/assets/img/hangman/hangman20.gif",
  "/src/assets/img/hangman/hangman21.gif",
  "/src/assets/img/hangman/hangman22.gif",
];

let imgCount = ref(0);
let currentImg = ref(imgSrc[0]);
const isRunning = ref(false);

function changeImg() {
  if (isRunning.value) return;
  isRunning.value = true;

  imgCount.value++;
  console.log(imgCount.value);

  if (imgCount.value % 2 !== 0) {
    //sparar imgCount i en variabel som jag använder, så att inte användaren kan klicka medans bilderna laddar
    const currentCount = imgCount.value;
    const gifPreload = new Image();
    gifPreload.src = imgSrc[imgCount.value];

    gifPreload.onload = function () {
      currentImg.value = imgSrc[imgCount.value];

      setTimeout(function () {
        currentImg.value = imgSrc[currentCount + 1];
        //Den sparas sedan tillbaka i imgCount så att imgCount har korrekt värde igen
        imgCount.value = currentCount + 1;

        if (currentCount == 19) {
          setTimeout(function () {
            imgCount.value = currentCount + 2;
            currentImg.value = imgSrc[currentCount + 2];
            console.log(currentCount);
            isRunning.value = false;
          }, 3000);
        } else {
          isRunning.value = false;
        }
      }, 900);
    };
  }
}

//SPEL
//Variabler för spelet
const alphabet = [..."abcdefghijklmnopqrstuvwxyzåäö"];

const words = [
  {
    swedish: "Äpple",
    english: "Apple",
  },
  {
    swedish: "Päron",
    english: "Pear",
  },
  {
    swedish: "Apelsin",
    english: "Orange",
  },
];
let secretWord = ref("");
let letters = [];
let errorsLeft = ref(10);

function playGame() {
  let random = Math.floor(Math.random() * words.length);
  secretWord.value = words[random].swedish.toUpperCase();
  console.log(secretWord);
}

function checkLetter(letter) {
  letter = letter.toUpperCase();

  let correct = secretWord.value.indexOf(letter) > -1;
  console.log(correct);

  if (!correct) {
    errorsLeft.value -= 1;
    console.log(errorsLeft);
  }

  return correct;
}

function getWordStatus(letter) {
  let wordStatus = [];
  const splitWord = secretWord.split("");

  splitWord.forEach(function letter{

  } )
}
</script>

<template>
  <article id="hangman">
    <!-- Instruktioner -->
    <BModal
      v-model="showInstructions"
      ok-title="Got it"
      title="Instructions!"
      cancel-title="Go Back"
      @cancel="goBackHome"
      @ok="closeInstructions"
    >
      <div class="instructions-box">
        <p>1. Read the captions carefully.</p>
        <p>2. Choose the correct answer from the options .</p>
        <p>3. Select only one answer per question.</p>
        <p>4. Review your answers before submitting.</p>
        <p>5. Good luck!!</p>
      </div>
    </BModal>

    <!-- Spel -->
    <h1>Hangman</h1>
    <img width="700" :src="currentImg" alt="" />
    <BButton @click="changeImg" :disabled="isRunning">Wrong Answer</BButton>

    <div>
      <b-card-group class="d-flex gap-2">
        <b-card
          bg-variant="fourth"
          text-variant="primary"
          class="text-center"
          v-for="(letter, index) in alphabet"
          :key="index"
          @click="checkLetter(letter)"
        >
          <b-card-text class="letter">{{ letter.toUpperCase() }}</b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </article>
</template>
