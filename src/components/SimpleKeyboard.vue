<template>
  <div class="simple-keyboard"></div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { ref, onMounted, watch } from "vue";

const emit = defineEmits(["onKeyPress"]);

const props = defineProps({
  guessedLetters: Object,
  restartKb: Boolean,
});

const keyboard = ref(null);
const savedLetters = ref("");

const onKeyPress = (button) => {
  emit("onKeyPress", button);
};

onMounted(() => {
  keyboard.value = new Keyboard("simple-keyboard", {
    layout: {
      default: [
        "q w e r t y u i o p å",
        "a s d f g h j k l ö ä",
        "{enter} z x c v b n m {bksp}",
      ],
    },
    onKeyPress: onKeyPress,
  });
});

watch(
  () => props.guessedLetters,
  (guessedLetters) => {
    keyboard.value.addButtonTheme(guessedLetters.miss.join(" "), "miss");
    keyboard.value.addButtonTheme(guessedLetters.found.join(" "), "found");
    keyboard.value.addButtonTheme(guessedLetters.hint.join(" "), "hint");
    savedLetters.value = guessedLetters;
  },
  { deep: true },
);

watch(
  () => props.restartKb,
  (restartStatus) => {
    if (restartStatus === true) {
      keyboard.value.removeButtonTheme(
        savedLetters.value.miss.join(" ") +
          " " +
          savedLetters.value.found.join(" ") +
          " " +
          savedLetters.value.hint.join(" "),
        "miss found hint",
      );
    }
  },
);
</script>

<style>
div.miss {
  background-color: var(--bs-secondary) !important;
  color: var(--bs-white);
}

div.found {
  background-color: var(--bs-success) !important;
  color: var(--bs-white);
}

div.hint:not(.found) {
  background-color: var(--bs-warning) !important;
  color: var(--bs-white);
}
</style>
