<script setup>
import { ref } from "vue";

const showInstructions = ref(true);

function closeInstructions() {
  showInstructions.value = false;
}
</script>

<template>
  <BModal
    v-model="showInstructions"
    ok-title="Got it"
    title="Instructions!"
    @click="closeInstructions"
  >
    <p>1. Read the captions carefully.</p>
    <p>2. Choose the correct answer from the options .</p>
    <p>3. Select only one answer per question.</p>
    <p>4. Review your answers before submitting.</p>
    <p>4. Good luck!!</p>
  </BModal>
</template>
