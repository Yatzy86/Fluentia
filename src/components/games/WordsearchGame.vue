<script setup>
//importerar wordrow, simplekeyboard från komponenter
//Importerar reactive, onMounted och ref från Vue
//Reactive används främst för vissa tillstånd som objekt och arrayer.
import WordRow from "../WordRow.vue";
import SimpleKeyboard from "../SimpleKeyboard.vue";
import { reactive, onMounted, computed, ref, onUnmounted } from "vue";
import { useLevelStore } from "../LevelSystem.js";
import popup from "../LevelShow.vue"

const levelStore = useLevelStore();

//Här i word variabeln finns både de svenska och hint(english)

const word = [
  {
    swedish: "äpple",
    english: "A fruit",
  },
  {
    swedish: "banan",
    english: "A fruit",
  },
  {
    swedish: "hoppa",
    english: "An action",
  },
  {
    swedish: "spela",
    english: "An activity",
  },
  {
    swedish: "rolig",
    english: "A personality trait",
  },
  {
    swedish: "snabb",
    english: "A speed",
  },
  {
    swedish: "stark",
    english: "A physical trait",
  },
  {
    swedish: "liten",
    english: "A size",
  },
  {
    swedish: "älska",
    english: "A feeling",
  },
  {
    swedish: "snöre",
    english: "An object to tie something",
  },
  {
    swedish: "morot",
    english: "A vegetable",
  },
  {
    swedish: "väder",
    english: "Rain, sun and windy",
  },
  {
    swedish: "affär",
    english: "A place",
  },
];
//Startar om tangentbordet
const restartKeyboard = ref(false);
//Startar om orden
const restartWords = ref(false);
//Denna blandar ord med hjälp av math.floor och math.random.
const randomWord = ref(word[Math.floor(Math.random() * word.length)]);
//Denna blandar de svenska orden
const randomWordSwe = ref(randomWord.value.swedish);
//Denna blandar de engelska orden
const randomWordEng = ref(randomWord.value.english);
//Denna gömmer ledtråden
const hintOpen = ref(false);

//Här är funktionen för newGame
//Den blandar orden ifrån word variabeln
//Därefter blandas de i både svenska och engleska och lägger sig i randomWordSwe.value och randomWordEng.value
//När det blandats så lägger den sig i state.solution
//Startar med 6 gissningar(state.guesses)
//Startar på 0 gissningar(state.currentGuessIndex)
//Startar om tangentborden och orden
const newGame = () => {
  randomWord.value = word[Math.floor(Math.random() * word.length)];
  randomWordSwe.value = randomWord.value.swedish;
  randomWordEng.value = randomWord.value.english;
  state.solution = randomWordSwe;
  state.guesses = ["", "", "", "", "", ""];
  state.currentGuessIndex = 0;
  restartKeyboard.value = true;
  restartWords.value = true;
};

//I state ligger solution där det svenska ordet blandas och läggs in
//6 gissningar
//Nuvarande frågor på 0
//Här är guessed letters miss, found och hint
//De är kopplade till tangentbordet och klick
//Hint betydet att bokstaven finns
//Miss att den inte finns
//Found ifall den är på helt rätt plats
const state = reactive({
  solution: randomWordSwe,
  guesses: ["", "", "", "", "", ""],
  currentGuessIndex: 0,
  guessedLetters: {
    miss: [],
    found: [],
    hint: [],
  },
});
//Denna funktionen startar false men blir här true eftersom denna är kopplad till
//knappen showHide
//Vid andra ord så växlar den mellan true/false när man klickar på knappen
const toggleHint = () => {
  hintOpen.value = !hintOpen.value;
};
//Ifall du vinner, vid andra ord ifall gissningen stämmer överens med svaret
const wonGame = computed(
  () => state.guesses[state.currentGuessIndex - 1] === state.solution,
);
//Ifall du förlorar
const lostGame = computed(() => !wonGame.value && state.currentGuessIndex >= 6);

//Funktionen handleInput tar med key som parameter
//Om du redan har vunnit eller om du använt dina 6 försök så avbryts funktionen
const handleInput = (key) => {
  if (state.currentGuessIndex >= 6 || wonGame.value) {
    return;
  }

  const currentGuess = state.guesses[state.currentGuessIndex];

  //Om tangentbordet startas om
  //Så ska tangentbordet inaktiveras och det händer likadant med att starta om orden
  //Frågorna börjar om med guessed letters
  if (restartKeyboard.value === true) {
    restartKeyboard.value = false;
    restartWords.value = false;

    state.guessedLetters = {
      miss: [],
      found: [],
      hint: [],
    };
  }

  //Om du tycker på enter(Skickar frågan)
  //Och om din nuvarande gissning är lika med 5
  //Så börjar du på nästa rad
  //Den loopar igenom gissningslängden och låter c spara in vilken bokstav
  //Om c alltså bokstaven finns med i det rätta svaret(state.solution.charAt) så pushas den in i found och blir grön
  //Annars ifall den finns men inte är i rätt position för indexOf kikar igenom arrayen, då pushas den in i hint och blir gul
  //Om inget av detta stämmer så pushas den in i miss

  if (key === "{enter}") {
    if (currentGuess.length === 5) {
      for (let i = 0; i < currentGuess.length; i++) {
        let c = currentGuess.charAt(i);
        if (c == state.solution.charAt(i)) {
          state.guessedLetters.found.push(c);
        } else if (state.solution.indexOf(c) != -1) {
          state.guessedLetters.hint.push(c);
        } else {
          state.guessedLetters.miss.push(c);
        }
      }
      state.currentGuessIndex++;
      levelStore.addXP(500); // levelsystem 500xp
    }

    //Om du trycker på backspace
    //Den sparar in det du skriver in i state.guesses vid andra ord vad du skrivit in och tar bort den senaste bokstaven
  } else if (key == "{bksp}") {
    state.guesses[state.currentGuessIndex] = currentGuess.slice(0, -1);

    //Annars om längden på gissningen är mindre än 5, så du kan inte skriva in mer än 5 tecken
  } else if (currentGuess.length < 5) {
    //Den tillåter endast a-z A-ZåäöÅäö
    const alphaRegex = /[a-zA-ZåäöÅÄÖ]+/;
    if (alphaRegex.test(key)) {
      //Den lägger då till vilken bokstav det är utefter alphaRegex
      state.guesses[state.currentGuessIndex] += key;
    }
  }
};

const handleKeyDown = (e) => {
  const tag = document.activeElement.tagName;
  //Denna kollar vilka element som är aktiva
  //Om användaren skrivet i inputfält, textarea och button så ska den inte göra något
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") {
    return;
  }
  //Stoppar defaultbeteende på webbsidan
  e.preventDefault();
  //Här har jag kopplat enter, backspace och å,ä och ö.
  let key =
    e.keyCode === 13
      ? "{enter}"
      : e.keyCode === 8
        ? "{bksp}"
        : e.keyCode === 221
          ? "å"
          : e.keyCode === 222
            ? "ä"
            : e.keyCode === 192
              ? "ö"
              : //Den lägger in bokstaven och gör den till små bokstäver
                String.fromCharCode(e.keyCode).toLowerCase();

  //Här startar spelet
  handleInput(key);
};
//onMounted menas med att detta startar när du kommer in på sidan
onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});
//Denna stänger av lyssnandet av tangenter när du lämnar
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <popup/>
  <div
    class="game wrapper d-flex flex-column min-vh-100 mx-auto"
    style="max-width: 28rem"
  >
    <p class="info">
      When you have clicked the newgame button you need to mouseclick on the
      site to make the keyboard work
    </p>
    <!-- Ifall du vinner så visas wonGame och ifall du förlorar så visas lostGame -->
    <p v-if="wonGame" class="text-center">
      Congratz on your win! You did it on
      {{ state.currentGuessIndex }} tries!
    </p>
    <p v-else-if="lostGame" class="text-center">Out of tries</p>

    <!-- Hinten syns när du klickar på knappen toggleHint -->
    <div @click="toggleHint" v-if="!hintOpen">
      <button class="btn btn-third showHide">Show in english</button>
    </div>
    <div v-else>
      <button @click="toggleHint" class="btn btn-third showHide">Hide</button>
      <p class="score">{{ randomWordEng }}</p>
    </div>
    <div>
      <!-- Tar in komponenten word-row -->
      <!-- Word row loopar igenom gissningar, en rad / guess -->
      <!-- :solution state.solution skickar in rätt svar i lösningen -->
      <!-- :submitted Om raden är true så ska den färgläggas -->
      <!-- :solution state.solution skickar in rätt svar i lösningen -->
      <!-- restardW restartWords skickar till wordrow att starta om orden -->
      <word-row
        v-for="(guess, i) in state.guesses"
        :key="i"
        :value="guess"
        :solution="state.solution"
        :submitted="i < state.currentGuessIndex"
        :restartW="restartWords"
      />
    </div>

    <!-- Tar in komponenten simple-keyboard -->
    <!-- Tar emot knapptryckningar från tangentbordet -->
    <!-- restartKb restartKeyboard skickar till wordrow att starta om tangentbordet -->
    <!-- guessedletters skickar vilka bokstäver som är rätt/fel som sedan färgar -->

    <simple-keyboard
      @onKeyPress="handleInput"
      :restartKb="restartKeyboard"
      :guessedLetters="state.guessedLetters"
    />
    <button
      v-on:keypress="(e) => e.preventDefault()"
      @click="newGame"
      class="btn btn-third newGameButton"
    >
      New game
    </button>
  </div>
</template>

<style scoped>
.game-wrapper {
  width: 100%;
  max-width: 28rem;
  padding: 1rem;
}

.info {
  color: #fff;
  font-size: 0.75rem;
  text-align: center;
}

.text-center {
  color: #fff;
  font-size: 1.25rem;
  text-align: center;
}

.showHide {
  display: flex;
  padding: 0.5 rem 0.75rem;
  background-color: #e7c558;
  border-radius: 0.5rem;
  margin: auto;
  font-size: 1rem auto;
}

.newGameButton {
  width: 100%;
  max-width: 12rem;
  margin: 1rem auto;
}

.score {
  color: #fff;
  font-size: 1.25rem;
  text-align: center;
}
.showHide {
  display: flex;
  padding: 0.5rem;
  background-color: #e7c558;
  border-radius: 0.5rem;
  margin: auto;
}

@media (max-width: 410px) {
  .game-wrapper {
    justify-content: flex-start !important;
    padding: 0.5rem;
    gap: 0.5rem;
    max-width: 360px;
  }
  .text-center,
  .score {
    font-size: 1rem;
  }
  .showHide {
    font-size: 0.9rem;
    padding: 0.4rem 0.7rem;
    margin-top: 0.25rem;
    margin-bottom: 0.4rem;
  }

  .word-row-bootstrap {
    gap: 0.2rem;
  }

  .letter-box {
    font-size: 1rem;
  }
  .newGameButton {
    width: 100%;
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    padding: 0.5rem;
  }
}
@media (min-width: 768px) {
  .game-wrapper {
    max-width: 32rem;
  }
  .text-center,
  .score {
    font-size: 1.35rem;
  }
}
</style>
