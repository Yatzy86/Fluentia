<script setup>
import WordRow from "../WordRow.vue";
import SimpleKeyboard from "../SimpleKeyboard.vue";
import { reactive, onMounted, computed, ref } from "vue";
import { useLevelStore } from "../LevelSystem.js"

const levelStore = useLevelStore()   
//Här finns både de svenska och engelska översättningarna
const word = [
  {
    swedish: "äpple",
    english: "apple",
  },
  {
    swedish: "banan",
    english: "banana",
  },
  {
    swedish: "hoppa",
    english: "jump",
  },
  {
    swedish: "spela",
    english: "play",
  },
  {
    swedish: "rolig",
    english: "funny",
  },
  {
    swedish: "snabb",
    english: "fast",
  },
  {
    swedish: "stark",
    english: "strong",
  },
  {
    swedish: "liten",
    english: "small",
  },
  {
    swedish: "älska",
    english: "love",
  },
  {
    swedish: "snöre",
    english: "rope",
  },
  {
    swedish: "morot",
    english: "carrot",
  },
  {
    swedish: "väder",
    english: "weather",
  },
  {
    swedish: "affär",
    english: "store",
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
const toggleHint = () => {
  hintOpen.value = !hintOpen.value;
};
//Ifall du vinner
const wonGame = computed(
  () => state.guesses[state.currentGuessIndex - 1] === state.solution,
);
//Ifall du förlorar
const lostGame = computed(() => !wonGame.value && state.currentGuessIndex >= 6);

//Funktionen handleInput tar med key som parameter
//Om är like med eller mindre än 6 så vinner du
const handleInput = (key) => {
  if (state.currentGuessIndex >= 6 || wonGame.value) {
    return;
  }

  const currentGuess = state.guesses[state.currentGuessIndex];

  if (restartKeyboard.value === true) {
    restartKeyboard.value = false;
    restartWords.value = false;

    state.guessedLetters = {
      miss: [],
      found: [],
      hint: [],
    };
  }

  if (key === "{enter}") {
    if (currentGuess.length === 5) {
      state.currentGuessIndex++; 
      levelStore.addXP(500) // levelsystem 500xp
      for (var i = 0; i < currentGuess.length; i++) {
        let c = currentGuess.charAt(i);
        if (c == state.solution.charAt(i)) {
          state.guessedLetters.found.push(c);
        } else if (state.solution.indexOf(c) != -1) {
          state.guessedLetters.hint.push(c);
        } else {
          state.guessedLetters.miss.push(c);
        }
      }
    }
  } else if (key == "{bksp}") {
    state.guesses[state.currentGuessIndex] = currentGuess.slice(0, -1);
  } else if (currentGuess.length < 5) {
    const alphaRegex = /[a-zA-ZåäöÅÄÖ]+/;
    if (alphaRegex.test(key)) {
      state.guesses[state.currentGuessIndex] += key;
    }
  }
};

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    e.preventDefault();

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
                : String.fromCharCode(e.keyCode).toLowerCase();
    handleInput(key);
  });
});
</script>

<template>
  <div
    class="d-flex flex-column vh-100 mx-auto justify-content-evenly"
    style="max-width: 28rem"
  >
    <div @click="toggleHint" v-if="!hintOpen">
      <button class="btn btn-third showHide">Show in english</button>
    </div>
    <div v-else>
      <button @click="toggleHint" class="btn btn-third showHide">Hide</button>
      <p class="score">{{ randomWordEng }}</p>
    </div>
    <div>
      <word-row
        v-for="(guess, i) in state.guesses"
        :key="i"
        :value="guess"
        :solution="state.solution"
        :submitted="i < state.currentGuessIndex"
        :restartW="restartWords"
      />
    </div>

    <p v-if="wonGame" class="text-center">
      Congratz on your win! You did it on
      {{ state.currentGuessIndex }} tries!
    </p>
    <p v-else-if="lostGame" class="text-center">Out of tries</p>

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
.text-center {
  color: #fff;
  font-size: 1.25rem;
  text-align: center;
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
</style>
