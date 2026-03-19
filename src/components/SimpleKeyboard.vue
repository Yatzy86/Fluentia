<template><div class="simple-keyboard"></div></template>
<script setup>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { ref, onMounted, watch } from "vue";
// import layout from 'simple-keyboard-layouts/build/layouts/swedish'

const emit = defineEmits(["onKeyPress"]);

const props = defineProps({
  guessedLetters: Object,
  restartKb: Boolean,
});

const keyboard = ref(null);
const savedLetters = ref("");

const onKeyPress = (button) => {
  emit("onKeyPress", button); //Emit-name and payload
};

//Mount before access div
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
  (guessedLetters, _prevGuessedLetters) => {
    //Addbuttontheme lägger till en klass till knapparna
    keyboard.value.addButtonTheme(guessedLetters.miss.join(" "), "miss");
    keyboard.value.addButtonTheme(guessedLetters.found.join(" "), "found");
    keyboard.value.addButtonTheme(guessedLetters.hint.join(" "), "hint");
    savedLetters.value = guessedLetters;
    console.log("letter:", savedLetters.value, guessedLetters);
  },
  //Deep för att vi kikar på objektens egenskaper
  { deep: true },
);

watch(
  () => props.restartKb,
  (restartStatus, _prevRestartStatus) => {
    if (restartStatus === true) {
      // alert('alerting')
      keyboard.value.removeButtonTheme(
        savedLetters.value.miss.join(" ") +
          " " +
          savedLetters.value.found.join(" ") +
          " " +
          savedLetters.value.hint.join(" "),
        "miss found hint",
      );
      // keyboard.value.removeButtonTheme(savedLetters.value.found.join(' '), 'miss found hint')
      // keyboard.value.removeButtonTheme(savedLetters.value.hint.join(' '), 'miss found hint')
    }
  },
);
</script>

<style>
div.miss {
  @apply bg-gray-500 !important;
  @apply text-white;
}

div.found {
  @apply bg-green-600 !important;
  @apply text-white;
}
div.hint:not(.found) {
  @apply bg-yellow-500 !important;
  @apply text-white;
}
</style>
