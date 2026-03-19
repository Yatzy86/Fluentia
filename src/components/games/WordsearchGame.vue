<script setup>
import WordRow from "../WordRow.vue";
import SimpleKeyboard from "../SimpleKeyboard.vue";
import { reactive, onMounted, computed, ref } from "vue";

const restartKeyboard = ref(false);
const restartWords = ref(false);

const newGame = () => {
  state.solution = randomWord;
  state.guesses = ["", "", "", "", "", ""];
  state.currentGuessIndex = 0;

  restartKeyboard.value = true;
  restartWords.value = true;
};

const word = [
  "äpple",
  "banan",
  "apple",
  "huset",
  "spring",
  "hoppa",
  "drack",
  "rolig",
  "snabb",
  "stark",
  "liten",
  "älska",
  "snöre",
  "morot",
  "tröja",
  "affär",
];

const randomWord = word[Math.floor(Math.random() * word.length)];

const state = reactive({
  solution: randomWord,
  guesses: ["", "", "", "", "", ""],
  currentGuessIndex: 0,
  guessedLetters: {
    miss: [],
    found: [],
    hint: [],
  },
});

const wonGame = computed(
  () => state.guesses[state.currentGuessIndex - 1] === state.solution,
);

const lostGame = computed(() => !wonGame.value && state.currentGuessIndex >= 6);

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
            ? "Å"
            : e.keyCode === 222
              ? "Ä"
              : e.keyCode === 192
                ? "Ö"
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

    <p v-if="wonGame" class="text-center">Congratz on your win!</p>
    <p v-else-if="lostGame" class="text-center">Out of tries</p>

    <simple-keyboard
      @onKeyPress="handleInput"
      :restartKb="restartKeyboard"
      :guessedLetters="state.guessedLetters"
    />

    <button
      v-on:keypress="(e) => e.preventDefault()"
      @click="newGame"
      class="btn btn-primary"
    >
      New game
    </button>
  </div>
</template>

<style scoped></style>
