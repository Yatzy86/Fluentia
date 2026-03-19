<script setup>
import WordRow from "./components/WordRow.vue";
import SimpleKeyboard from "./components/SimpleKeyboard.vue";
import { reactive, onMounted, computed, ref } from "vue";

const restartKeyboard = ref(false);
const restartWords = ref(false);

const newGame = () => {
  alert("hej");
  state.solution = randomWord;
  state.guesses = ["", "", "", "", "", ""];
  state.currentGuessIndex = 0;

  restartKeyboard.value = true;
  restartWords.value = true;

  // state.guessedLetters = {
  //   miss: [],
  //   found: [],
  //   hint: [],
  // }

  // restartKeyboard.value = false
};
const word = [
  "books",
  "boots",
  "apple",
  "house",
  "bread",
  "lights",
  "train",
  "bread",
  "table",
  "chair",
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
//Kollar ifall vår sista gissning är samma som
const wonGame = computed(
  () => state.guesses[state.currentGuessIndex - 1] === state.solution,
);

const lostGame = computed(() => !wonGame.value && state.currentGuessIndex >= 6);

//Ifall du inte har några frågor kvar eller har vunnit spelet
const handleInput = (key) => {
  if (state.currentGuessIndex >= 6 || wonGame.value) {
    return;
    //No typing if we are out of guesses
  }

  const currentGuess = state.guesses[state.currentGuessIndex]; //Checks for answers

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
    // alert('restart: ' + restartWords.value)
    //Send guess
    if (currentGuess.length === 5) {
      state.currentGuessIndex++;
      //Loops through every character in our guess
      for (var i = 0; i < currentGuess.length; i++) {
        //3 differen conditionals
        //Track currentcharacter
        //If the char is in books it pushes
        let c = currentGuess.charAt(i);
        if (c == state.solution.charAt(i)) {
          state.guessedLetters.found.push(c);
          //Push to hint
        } else if (state.solution.indexOf(c) != -1) {
          state.guessedLetters.hint.push(c);
        } else {
          state.guessedLetters.miss.push(c);
        }
      }
    }
  } else if (key == "{bksp}") {
    //Remove last letter
    state.guesses[state.currentGuessIndex] = currentGuess.slice(0, -1); //Takes the last character by using slice
  } else if (currentGuess.length < 5) {
    //Checks if our currentguess is less than 5
    //Add letter if alphabetical
    const alphaRegex = /[a-zA-Z]/;
    if (alphaRegex.test(key)) {
      //Add key to our current guess
      state.guesses[state.currentGuessIndex] += key;
    }
  }

  //Hanterar alla knapptryck
};

onMounted(() => {
  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    //Här fångar vi nyckeln
    let key =
      e.keyCode == 13 //Enter tangenten är nr 13
        ? "{enter}"
        : e.keyCode == 8 //Backspace tangenten är nr 8
          ? "{bksp}"
          : String.fromCharCode(e.keyCode).toLowerCase();
    handleInput(key);
  });
});
</script>

<template>
  <div class="flex flex-col h-screen max-w-md mx-auto justify-evenly">
    <div>
      <!-- v-show="!restartKeyboard" -->
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
    <p v-else-if="lostGame">Out of tries</p>
    <!-- v-show="!restartKeyboard" -->
    <simple-keyboard
      @onKeyPress="handleInput"
      :restartKb="restartKeyboard"
      :guessedLetters="state.guessedLetters"
    />
    <button v-on:keypress="(e) => e.preventDefault()" @click="newGame">
      New game
    </button>
  </div>
</template>

<style scoped></style>
