<script setup>
  import LetterBox from "./LetterBox.vue";
  import { ref, watch } from "vue";

  const props = defineProps({
    value: String,
    solution: String,
    submitted: Boolean,
    restartW: Boolean,
  });

  const colors = ref(["", "", "", "", "", ""]);

  watch(
    () => props.submitted,
    async (submitted, prevSubmitted) => {
      if (props.submitted) {
        //If props submitted is true
        let s = props.solution;
        let v = props.value;

        let temp = ["gray", "gray", "gray", "gray", "gray"];
        let letterPool = [];
        //Loopar över solution och se ifall våra values matchar
        //Den loopar 5 gånger
        for (let i = 0; i < 5; i++) {
          if (s.charAt(i) == v.charAt(i)) {
            //Om de matchar
            temp[i] = "green";
          } else {
            //Annars pushas bokstaven till letterPool
            letterPool.push(s.charAt(i));
          }
        }
        for (let i = 0; i < 5; i++) {
          //Här loopar den 5 gånger igen och kollar ifall bokstaven är grå
          //Om den inte har blivit grå än
          if (temp[i] == "gray") {
            //Kollar ifall den finns i letterPool
            if (letterPool.indexOf(v.charAt(i)) != -1) {
              //Om den finns i letterPool så tar den bort den med hjälp av splice och ändrar färgen till gul
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
  <div class="grid max-w-xs grid-cols-5 gap-1 mx-auto mb-1">
    <!-- Startar från 1 inte 0 -->

    <letter-box
      v-for="i in 5"
      :key="i"
      :letter="value[i - 1]"
      :color="colors[i - 1]"
    />
  </div>
</template>
