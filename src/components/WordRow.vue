<script setup>
import LetterBox from "./LetterBox.vue";
import { ref, watch } from "vue";

const props = defineProps({
  value: String,
  solution: String,
  submitted: Boolean,
  restartW: Boolean,
  secretLetters: Array,
});

const secretLetters = props.secretLetters;

const colors = ref(["", "", "", "", "", ""]);

watch(
  () => props.submitted,
  async (submitted, prevSubmitted) => {
    if (props.submitted) {
      let s = props.solution;
      let v = props.value;

      // let temp = ["gray", "gray", "gray", "gray", "gray"];
      let temp = secretLetters.map(() => "gray");
      let letterPool = [];
      console.log(temp);
      for (let i = -1; i < secretLetters.length; i++) {
        if (s.charAt(i) == v.charAt(i)) {
          temp[i] = "green";
        } else {
          letterPool.push(s.charAt(i));
        }
      }

      for (let i = 0; i < secretLetters.length; i++) {
        if (temp[i] == "gray") {
          if (letterPool.indexOf(v.charAt(i)) != -1) {
            letterPool.splice(letterPool.indexOf(v.charAt(i)), 1);
            temp[i] = "yellow";
          }
        }
        colors.value[i] = temp[i];
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  },
);

watch(
  () => props.restartW,
  async (restartW, prevRestartW) => {
    if (restartW === true) {
      for (let i = 0; i < secretLetters.length; i++) {
        colors.value[i] = "white";
        await new Promise((resolve) => setTimeout(resolve));
      }
    }
  },
);
</script>

<template>
  <div
    class="word-row-bootstrap mx-auto mb-1"
    :style="{
      gridTemplateColumns: 'repeat(' + secretLetters.length + ', 1fr)',
    }"
  >
    <letter-box
      class="letterBox"
      v-for="i in secretLetters.length"
      :key="i"
      :letter="value[i - 1]"
      :color="colors[i - 1]"
    />
  </div>
</template>

<style scoped>
.word-row-bootstrap {
  display: grid;
  gap: 0.25rem;
  max-width: 20rem;
}

.letterBox {
  min-width: 2em;
}
</style>
