<template>
  <div class="simple-keyboard"></div>
</template>

<script setup>
//Har installerat npm paketet simple-keyboard
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
//Använder mig av ref, onMounted och watch
import { ref, onMounted, watch } from "vue";

const emit = defineEmits(["onKeyPress"]);

const props = defineProps({
  guessedLetters: Object,
  restartKb: Boolean,
});

//En variabel med namnet keyboard
const keyboard = ref(null);
//En variabel med de sparade bokstäverna
const savedLetters = ref("");
//Det som händer när man trycker på knappen
const onKeyPress = (button) => {
  emit("onKeyPress", button);
};

//När sidan startar så kommer tangentbordet fram

onMounted(() => {
  keyboard.value = new Keyboard("simple-keyboard", {
    //Layouten för tangentbordet
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
//Här ser vi över vad man gissar på för bokstäver och lägger in dem i miss ifall de inte finns, found ifall de är helt på rätt plats och hint ifall de finnns men är på fel plats.
//Detta gör vi via en prop som tas upp i wordsearch spelet
watch(
  () => props.guessedLetters,
  (guessedLetters) => {
    //Addbuttontheme lägger till en klass, i detta fallet är det blir miss, found och hint en klass som används nere i style
    keyboard.value.addButtonTheme(guessedLetters.miss.join(" "), "miss");
    keyboard.value.addButtonTheme(guessedLetters.found.join(" "), "found");
    keyboard.value.addButtonTheme(guessedLetters.hint.join(" "), "hint");
    //Allt som läggs in i guessedLetters sparas i savedLetters.value
    savedLetters.value = guessedLetters;
  },
  //Deep kikar i objektets egenskaper
  { deep: true },
);
//Har även lagt till en watch som även tar bort allt när spelet startar om.
//Detta läggs till i komponenten via restartKeyboard och ed hjälp av att ha v bindat restartKb
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
/* Här läggs färgerna till för miss, found och hint */
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
