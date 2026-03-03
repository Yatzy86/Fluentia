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
    <p>1. Click two cards to flip them.</p>
    <p>2. If they match they stay open.</p>
    <p>3. If not they flip back.</p>
    <p>4. Match all pairs to win.</p>
  </BModal>
</template>
