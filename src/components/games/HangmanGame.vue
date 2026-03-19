<script setup>
//ATT GÖRA
//Lägg till resultat:
//Styla GAME OVER och YOU WON sidan
//Kommentera
//Lägg till kategorier som frukter, fordon, skola osv?
//Skriv ut det engelska ordet som ett hint?
import { ref } from "vue";
import { useRouter } from "vue-router";
import words from "../../data/hangmanwords.js";

// //INSTRUKTIONER
const showInstructions = ref(true);
const router = useRouter();

function closeInstructions() {
  showInstructions.value = false;
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
  "/src/assets/img/hangman/hangman23.gif",
];

let imgCount = ref(0);
let currentImg = ref(imgSrc[0]);
const isRunning = ref(false);
const timeoutId = ref(null);

function changeImg() {
  if (isRunning.value) return;
  isRunning.value = true;

  imgCount.value++;
  const currentCount = imgCount.value;

  if (imgCount.value % 2 !== 0) {
    //sparar imgCount i en variabel som jag använder, så att inte användaren kan klicka medans bilderna laddar

    const gifPreload = new Image();
    gifPreload.src = imgSrc[imgCount.value];

    gifPreload.onload = function () {
      currentImg.value = imgSrc[imgCount.value];

      timeoutId.value = setTimeout(function () {
        currentImg.value = imgSrc[currentCount + 1];
        //Den sparas sedan tillbaka i imgCount så att imgCount har korrekt värde igen
        imgCount.value = currentCount + 1;

        if (currentCount == 19) {
          timeoutId.value = setTimeout(function () {
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

let secretObject = ref({});
let secretWord = ref("");
let secretTranslation = ref("");
let letters = [];
let errorsLeft = ref(10);
let correct = ref(false);
let guessedStatus = ref([]);
//sparar rätt och fel bokstäver för att uppdatera färg på knapparna
let correctLetters = ref([]);
let wrongLetters = ref([]);
let gameWon = ref(false);
let gameLost = ref(false);

function playGame() {
  // tar längden av words arrayen och gör en math random på den för att få ut ett random nummer. math floor rundar upp till ett helt tal
  let random = Math.floor(Math.random() * words.length);
  // använder det random numret för att få ett objekt med random index
  secretObject.value = words[random];
  // sparar det svenska och engelska orden i stora bokstäver i variabler
  secretWord.value = secretObject.value.swedish.toUpperCase();
  secretTranslation.value = secretObject.value.english.toUpperCase();
  //Räknar ut längd på ordet. guessedLetter initieras sedan med tomma strängar med hjälp av map
  const secretLetters = secretWord.value.split("");
  guessedStatus.value = secretLetters.map(() => "");
}

function resetGame() {
  // tar bort kvarliggande timeouts så att rätt bild kan visas
  clearTimeout(timeoutId.value);
  // Återställer alla variabler
  imgCount.value = 0;
  currentImg.value = imgSrc[0];
  isRunning.value = false;
  console.log(currentImg.value);
  errorsLeft.value = 10;
  letters = [];
  guessedStatus.value = [];
  correctLetters.value = [];
  wrongLetters.value = [];
  correct.value = false;
  gameWon.value = false;
  gameLost.value = false;
  //kör spelet
  playGame();
}

function checkLetter(letter) {
  // gör bokstaven stor
  letter = letter.toUpperCase();

  //VAD GÖR DETTA?
  if (letters.indexOf(letter) > -1) {
    return;
  }

  //pushar in bokstäver för att hålla koll på vilka bokstäver vi har kollat
  letters.push(letter);
  //Kollar index of bokstav i secretWord och om indexen är över -1(alltså att den finns i arrayen eftersom en array börjar på 0), så blir corrent lika med true
  correct.value = secretWord.value.indexOf(letter) > -1;

  // om bokstaven är fel(correct = false), så blir errorsLeft en siffra mindre, bilden byts och den pushar bokstaven till wrongLetters arrayen
  if (!correct.value) {
    errorsLeft.value -= 1;
    changeImg();
    wrongLetters.value.push(letter);
  } else {
    //annars pushas bokstaven till correctLetters arrayen
    correctLetters.value.push(letter);
  }
  // en array skapas för att hålla koll på status av ordet
  let wordStatus = [];
  //delar upp ordet i bokstäver
  const splitWord = secretWord.value.split("");

  //för varje bokstav så kollar vi igen om bokstaven finns i ordet. Vi håller även koll på gamla bokstäver och pushar in dem om de finns i ordet. På de delar av splitWord som vi inte har hittat den korrekta bokstaven så pushar vi en tom sträng.
  splitWord.forEach((letter) => {
    if (letters.indexOf(letter) > -1) {
      wordStatus.push(letter);
    } else {
      wordStatus.push("");
    }
  });

  //sen uppdateras guessedStatus med den senaste statusen av ordet. Detta görs för att få tillgång till den senaste statusen i en global variabel som vi kan använda nedanför i template
  guessedStatus.value = wordStatus;

  wonGame();
  lostGame();
}

function lostGame() {
  if (errorsLeft.value <= 0) {
    gameLost.value = true;
  }
}

function wonGame() {
  //guessedStatus är ordets status. Vi kollar om det finns tomma strängar i ordets status och om det inte finns det så betyder det att spelet är slut. .every kollar varje värde i arrayen och returnerar true eller false
  const guessed = guessedStatus.value.every((letter) => letter !== "");
  if (guessed) {
    gameWon.value = true;
    currentImg.value = imgSrc[22];
  }
}

playGame();
</script>

<template>
  <article id="hangman">
    <!-- INSTRUKTIONER -->
    <BModal
      v-model="showInstructions"
      ok-title="Got it"
      title="Instructions!"
      cancel-title="Go Back"
      @cancel="goBackHome"
      @ok="closeInstructions"
    >
      <div class="instructions-box">
        <p>1. Read the instructions carefully.</p>
        <p>2. Guess the hidden word by choosing one letter at a time.</p>
        <p>3. If your guess is correct, the letter appears in the word.</p>
        <p>4. if your guess is wrong, a balloon pops.</p>
        <p>5. You have 10 chances in total</p>
        <p>6. Keep track of the letters you have already guessed</p>
        <p>7. Guess the word before all the balloons pop to win</p>
        <p>8. Good luck and have fun!</p>
      </div>
    </BModal>

    <!-- SPEL -->
    <section class="game_section d-flex justify-content-center">
      <div>
        <img
          width="500"
          :src="currentImg"
          alt="animals in a boat, suspended over lava. The only thing holding the boat up being balloons."
        />
      </div>
      <div class="game_controls">
        <div v-if="gameWon">
          <h1>Congratulations!</h1>
          <h2>You won!</h2>
          <p>You found the secret word {{ secretWord }}</p>
          <p>In english this means {{ secretTranslation }}</p>
          <BButton @click="resetGame()">Play again</BButton>
        </div>

        <!-- Spela igen knapp. Visas bara när man har slut på gissningar(errorsLeft är 0) -->
        <div v-if="gameLost">
          <h1>You lost!</h1>
          <p>You couldn't find the secret word {{ secretWord }}</p>
          <p>In english this means {{ secretTranslation }}</p>
          <BButton @click="resetGame()" variant="third">Play again</BButton>
        </div>

        <!-- Ord som ska gissas.Visas som tom först men fylls med bokstäver när man gissat rätt och bokstäverna sparas i guessedStatus arrayen -->
        <div v-if="!gameLost && !gameWon" class="guessed_status d-inline-flex">
          <ul v-for="(letter, index) in guessedStatus" :key="index">
            <li
              class="fs-2 text-fourth"
              :style="{
                padding: letter === '' ? '0.5em' : '0em',
              }"
            >
              {{ letter }}
            </li>
          </ul>
        </div>

        <!-- Knappar för bokstäverna. Tryck för att gissa -->

        <b-card-group class="d-flex gap-2" v-if="!gameLost && !gameWon">
          <!-- Loops the letters from the alphabet array -->
          <b-card
            bg-variant="secondary"
            text-variant="primary"
            class="text-center"
            v-for="(letter, index) in alphabet"
            :key="index"
          >
            <!-- Stylar knapparna olika beroende på om det är rätt eller fel -->
            <!-- Gör knapparna som man har redan gissat på disabled eller när bilderna uppdateras -->
            <!-- Klickar man på knappen så körs funktionen checkLetter som tar med sig letter som en parameter -->
            <BButton
              variant="third"
              class="alphabet_button"
              :style="{
                backgroundColor: correctLetters.includes(letter.toUpperCase())
                  ? 'green'
                  : wrongLetters.includes(letter.toUpperCase())
                    ? 'red'
                    : '',
              }"
              :disabled="
                isRunning ||
                correctLetters.includes(letter.toUpperCase()) ||
                wrongLetters.includes(letter.toUpperCase())
              "
              @click="checkLetter(letter)"
            >
              <b-card-text class="letter">{{
                letter.toUpperCase()
              }}</b-card-text>
            </BButton>
          </b-card>
        </b-card-group>
      </div>
    </section>
  </article>
</template>
