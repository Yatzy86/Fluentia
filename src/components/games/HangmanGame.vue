<script setup>
//ATT GÖRA
//Lägg till resultat:
//Game over. När man har slut på gissningar så kommer game over bilden och allting förutom försök igen knapp kommer upp
//YOU WON. När man gissar alla rätt. Spelet avslutas och en YOU WON bild visas och en restart knapp
//Lägg till kategorier som frukter, fordon, skola osv.
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
let guessedLetters = ref([]);
//sparar rätt och fel bokstäver för att uppdatera färg på knapparna
let correctLetters = ref([]);
let wrongLetters = ref([]);

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
  guessedLetters.value = secretLetters.map(() => "");
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
  guessedLetters.value = [];
  correctLetters.value = [];
  wrongLetters.value = [];
  correct.value = false;
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

  //sen uppdateras guessedLetters med den senaste statusen av ordet. Detta görs för att få tillgång till den senaste statusen i en global variabel som vi kan använda nedanför i template
  guessedLetters.value = wordStatus;
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
        <p>1. Read the captions carefully.</p>
        <p>2. Choose the correct answer from the options .</p>
        <p>3. Select only one answer per question.</p>
        <p>4. Review your answers before submitting.</p>
        <p>5. Good luck!!</p>
      </div>
    </BModal>

    <!-- SPEL -->
    <section class="game_section">
      <img width="600" :src="currentImg" alt="" />

      <!-- Spela igen knapp. Visas bara när man har slut på gissningar(errorsLeft är 0) -->
      <div v-if="errorsLeft <= 0">
        <p>The secret word was {{ secretWord }}</p>
        <p>In english this means {{ secretTranslation }}</p>
        <BButton @click="resetGame()">Play again</BButton>
      </div>

      <!-- Ord som ska gissas.Visas som tom först men fylls med bokstäver när man gissat rätt och bokstäverna sparas i guessedLetters arrayen -->
      <div v-if="errorsLeft > 0" class="d-flex ms-2">
        <ul v-for="(letter, index) in guessedLetters" :key="index">
          <li class="p-3 fs-2 pe-4 text-fourth border-bottom">
            {{ letter }}
          </li>
        </ul>
      </div>

      <!-- Knappar för bokstäverna. Tryck för att gissa -->
      <!-- v-if="errorsLeft gömmer knapparna när en har slut på gissningar -->
      <div v-if="errorsLeft > 0">
        <b-card-group class="d-flex gap-2">
          <!-- Loops the letters from the alphabet array -->
          <b-card
            bg-variant="fourth"
            text-variant="primary"
            class="text-center"
            v-for="(letter, index) in alphabet"
            :key="index"
          >
            <!-- Stylar knapparna olika beroende på om det är rätt eller fel -->
            <!-- Gör knapparna som man har redan gissat på disabled eller när bilderna uppdateras -->
            <!-- Klickar man på knappen så körs funktionen checkLetter som tar med sig letter som en parameter -->
            <button
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
            </button>
          </b-card>
        </b-card-group>
      </div>
    </section>
  </article>
</template>
