<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const showInstructions = ref(true);
const router = useRouter();

function closeInstructions() {
  showInstructions.value = false;
}
function goBackHome() {
  router.push("/");
}
</script>

<template>
  <BModal
    v-model="showInstructions"
    ok-title="Got it"
    title="Instructions!"
    cancel-title="Go Back"
    @cancel="goBackHome"
    @ok="closeInstructions"
  >
    <div class="instructions-box">
      <p>1. Click two cards to flip them.</p>
      <p>2. If they match they stay open.</p>
      <p>3. If not they flip back.</p>
      <p>4. Match all pairs to win.</p>
      <p>5. Good luck!!</p>
    </div>
  </BModal>
</template>

<style lang="scss" scoped>
$color-1: #fdc921;
$color-2: #fdd85d;
$color-3: #fffdf5;
$color-4: #99d6ea;
$color-5: #6798c0;

:deep(.modal-title) {
  font-weight: 800;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.78);
  text-transform: uppercase;
}

:deep(.modal-header) {
  background: $color-1;
  text-align: center;
  border-bottom: 3px solid $color-5;
  padding: 14px 16px;
}
:deep(.modal-content) {
  border-radius: 14px;
  border: 2px solid $color-4;
  background-color: $color-3;
  overflow: hidden;
}
.instructions-box {
  background: $color-3;
  padding: 16px;
  border-radius: 12px;
  border: 2px dashed $color-4;
  position: relative;
}
.instructions-box p {
  background: $color-2;
  padding: 8px 12px;
  border-radius: 8px;
  margin: 8px 0;
  border-left: 4px solid $color-4;
  font-weight: 500;
}
</style>
