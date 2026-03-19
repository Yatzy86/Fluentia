<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import words from "../../data/hangmanwords.js";

// //INSTRUKTIONER
const showInstructions = ref(true);
const router = useRouter();

//Funktion för att stänga instruktioner
function closeInstructions() {
  showInstructions.value = false;
}
//Funktion för att gå tillbaka till HomeView
function goBackHome() {
  router.push("/");
}

// //BILDER
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

//Variabler för bilderna
let imgCount = ref(0);
let currentImg = ref(imgSrc[0]);
const isRunning = ref(false);
const timeoutId = ref(null);

//Funktion som byter bild varje gång man svarar fel
function changeImg() {
  //Används för att gör disable på knapparna medans bilderna laddas in
  if (isRunning.value) return;
  isRunning.value = true;

  //När jag kör så plussas imgCount upp en gång som gör att bilden byts
  imgCount.value++;
  //currentCount används i funktionen
  const currentCount = imgCount.value;

  //Körs om imgCount jämt fördelat med 2 inte ger några rester
  if (imgCount.value % 2 !== 0) {
    //laddar in gif bilden i förväg
    const gifPreload = new Image();
    gifPreload.src = imgSrc[imgCount.value];

    //När gif bilden laddats klart körs funktionen
    gifPreload.onload = function () {
      currentImg.value = imgSrc[imgCount.value];

      //Timeout funktion på 900 msk
      //Ett id sätts som jag sen använder för att stoppa timeout med cleartimeout
      timeoutId.value = setTimeout(function () {
        //Lägger till ett värde på currentImg, vilket gör att bilden byts ut
        currentImg.value = imgSrc[currentCount + 1];
        //currentCount sparas sedan tillbaka i imgCount så att det är säkert att imgCount har korrekt värde
        imgCount.value = currentCount + 1;

        //En timeout funktion som startar när currentCount är 19(imgSrc[20])
        if (currentCount == 19) {
          timeoutId.value = setTimeout(function () {
            //lägger till två på currentCount, vilket gör att två bilder visas efter varandra
            imgCount.value = currentCount + 2;
            currentImg.value = imgSrc[currentCount + 2];
            //isRunning blir false, vilket gör att knapparna m. disable går att trycka på
            isRunning.value = false;
          }, 3000);
        } else {
          isRunning.value = false;
        }
      }, 900);
    };
  }
}

// //SPEL
//Variabler för spelet
const alphabet = [..."abcdefghijklmnopqrstuvwxyzåäö"];
let secretObject = ref({});
let secretWord = ref("");
let secretTranslation = ref("");
let letters = [];
let errorsLeft = ref(10);
let correct = ref(false);
let guessedStatus = ref([]);
let correctLetters = ref([]);
let wrongLetters = ref([]);
let gameWon = ref(false);
let gameLost = ref(false);
let hintOpen = ref(false);

//Funktion för att köra spelet
function playGame() {
  // tar längden av den importade words arrayen och gör en math random på den för att få ut ett random nummer. math floor rundar upp till ett helt tal
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

//Funktion som körs när man trycker på 'Play Again'-knappen
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
  hintOpen.value = false;
  //kör spelet
  playGame();
}

//Funktion som kollar om bokstaven man valde är rätt eller inte
function checkLetter(letter) {
  // gör bokstaven stor
  letter = letter.toUpperCase();

  //kollar om man gissat på bokstaven. Om bokstaven finns redan så avbryts funktionen
  if (letters.indexOf(letter) > -1) {
    return;
  }
  //pushar in bokstäver för att hålla koll på vilka bokstäver vi har kollat
  letters.push(letter);

  //Kollar index av bokstav i secretWord och om indexen är över -1(alltså att den finns i arrayen eftersom en array börjar på 0), så blir correct lika med true
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

  //för varje bokstav så kollar vi igen om bokstaven finns i ordet. Vi håller även koll på gamla bokstäver och pushar in dem om de finns i ordet. På de delar av splitWord som vi inte har hittat den korrekta bokstaven så pushar vi in en tom sträng.
  splitWord.forEach((letter) => {
    if (letters.indexOf(letter) > -1) {
      wordStatus.push(letter);
    } else {
      wordStatus.push("");
    }
  });

  //sen uppdateras guessedStatus med den senaste statusen av ordet. Detta görs för att få tillgång till den senaste statusen i en global variabel som vi kan använda nedanför i template för att skriva ut ordet på sidan
  guessedStatus.value = wordStatus;

  //I slutet så körs varje gång funktioner som kollar om man har vunnit eller förlorat
  wonGame();
  lostGame();
}

//Funktion som kollar om man förlorat
function lostGame() {
  //Kollar om man har slut på gissningar och gör då gameLost till true
  if (errorsLeft.value <= 0) {
    gameLost.value = true;
  }
}

//Funktion som kollar om man har vunnit
function wonGame() {
  //guessedStatus är ordets status. Den kollar om det finns tomma strängar i ordets status och om det inte finns det så betyder det att spelet är slut och att man har vunnit. .every kollar varje värde i arrayen och returnerar true eller false(liknande forEach)
  const guessed = guessedStatus.value.every((letter) => letter !== "");
  if (guessed) {
    //gameWon blir till true och bilden för när man vunnit visas
    gameWon.value = true;
    currentImg.value = imgSrc[22];
  }
}

//Funktion som visar eller döljer letråden
function toggleHint() {
  hintOpen.value = !hintOpen.value;
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
    <section class="game-section d-flex justify-content-center">
      <!-- Spel Bilderna. Läses in via v-bind -->
      <div>
        <img
          width="500"
          :src="currentImg"
          alt="animals in a boat, suspended over lava. The only thing holding the boat up being balloons."
        />
      </div>

      <div class="game-controls">
        <!-- Meddelande vid vunnet spel -->
        <div v-if="gameWon" class="result-div">
          <h1>You won!</h1>
          <p>
            You found the secret word <span>{{ secretWord }}</span>
          </p>
          <p>
            In english this means <span>{{ secretTranslation }}</span>
          </p>
          <BButton @click="resetGame()" variant="third">Play again</BButton>
        </div>

        <!-- Meddelande vid förlorat spel -->
        <div v-if="gameLost" class="result-div">
          <h1>You lost!</h1>
          <p>
            You couldn't find the secret word <span>{{ secretWord }}</span>
          </p>
          <p>
            In english this means <span>{{ secretTranslation }}</span>
          </p>
          <BButton @click="resetGame()" variant="third">Play again</BButton>
        </div>

        <!-- Knapp för att visa och dölja letråden -->
        <div v-if="!gameLost && !gameWon" class="mt-2">
          <BButton @click="toggleHint()" v-if="!hintOpen" variant="primary"
            >Show in English</BButton
          >
          <!-- Letråden -->
          <div v-else class="d-flex align-items-center gap-2">
            <p class="fs-5 text-fourth m-0">
              {{ secretTranslation }}
            </p>
            <BButton @click="toggleHint()" variant="primary">Hide</BButton>
          </div>
        </div>

        <!-- Ord som ska gissas. Visas som tom först men fylls med bokstäver när man gissat rätt och bokstäverna sparas i guessedStatus arrayen -->
        <div v-if="!gameLost && !gameWon" class="guessed-status d-inline-flex">
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
              class="alphabet-button"
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
<style lang="scss" scoped>
$color-1: #fdc921;
$color-2: #fdd85d;
$color-3: #fffdf5;
$color-4: #99d6ea;
$color-5: #6798c0;

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
</style>
