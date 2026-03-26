<script setup>
//Här importeras Letterbox och ref, watch
import LetterBox from "./LetterBox.vue";
import { ref, watch } from "vue";
//Denna fångar upp propsen och säger vad för typ det ska vara

const props = defineProps({
  value: String,
  solution: String,
  submitted: Boolean,
  restartW: Boolean,
});
//Lagrar färgen
const colors = ref(["", "", "", "", "", ""]);
//Den bevakar när submitted ändras
watch(
  () => props.submitted,
  async (submitted, prevSubmitted) => {
    if (props.submitted) {
      let s = props.solution;
      let v = props.value;
      //Börjar med att alla rutor är tomma
      let temp = ["gray", "gray", "gray", "gray", "gray"];
      //Letterpool är en tom array och sparar in de som inte blivit gröna
      let letterPool = [];

      //Jämför gissningen med lösningen, bokstav för bokstav
      for (let i = 0; i < 5; i++) {
        //Om bokstaven finns på rätt plats/value så blir det grönt
        if (s.charAt(i) == v.charAt(i)) {
          temp[i] = "green";
        } else {
          //Bokstäver som inte blivit gröna sparas i letterpool
          letterPool.push(s.charAt(i));
        }
      }
      //Loopar igenom alla 5 bokstäver
      for (let i = 0; i < 5; i++) {
        //Om bokstaven inte var grön, men finns någon annanstans i lösningen så blir den gul
        //Bokstaven tas sedan bort från letterpool så att den inte räknas igen
        if (temp[i] === "gray") {
          if (letterPool.indexOf(v.charAt(i)) != -1) {
            letterPool.splice(letterPool.indexOf(v.charAt(i)), 1);
            temp[i] = "yellow";
          }
        }
        //Färgen för ruta i uppdateras
        colors.value[i] = temp[i];
        //Sätter färgen på rutan och väntar lite innan den andra färgläggs
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  },
);

watch(
  () => props.restartW,
  async (restartW, prevRestartW) => {
    if (restartW === true) {
      for (let i = 0; i < 5; i++) {
        colors.value[i] = "white";
        await new Promise((resolve) => setTimeout(resolve));
      }
    }
  },
);
</script>

<template>
  <div class="word-row-bootstrap mx-auto mb-1">
    <letter-box
      v-for="i in 5"
      :key="i"
      :letter="value[i - 1]"
      :color="colors[i - 1]"
    />
  </div>
</template>

<style scoped>
.word-row-bootstrap {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.25rem;
  max-width: 28rem;
  width: 100%;
  margin-inline: auto;
}

@media (max-width: 410px) {
  .word-row-bootstrap {
    gap: 0.1rem;
    max-width: 17rem;
  }
}
</style>
