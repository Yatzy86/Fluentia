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

const colors = ref(["", "", "", "", "", ""]);
//Denna ser över vad som skrivs in i submitted.
watch(
  () => props.submitted,
  async (submitted, prevSubmitted) => {
    if (props.submitted) {
      let s = props.solution;
      let v = props.value;

      let temp = ["gray", "gray", "gray", "gray", "gray"];
      //Letterpool är en tom array
      let letterPool = [];
      //Här hanteras det man skrivit in
      //Den ser över alla bokstäver
      for (let i = 0; i < 5; i++) {
        //Om svaret matchar value så blir det grönt
        if (s.charAt(i) == v.charAt(i)) {
          temp[i] = "green";
        } else {
          letterPool.push(s.charAt(i));
        }
      }

      for (let i = 0; i < 5; i++) {
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
