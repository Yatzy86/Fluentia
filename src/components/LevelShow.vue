<template>
  <div v-if="showLevelUp" class="popup">
    <span>🎉 Congratulations! You're now Level {{ levelStore.level }}</span>
    <button class="close-btn" @click="closeLevelUp">✕</button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useLevelStore } from "./LevelSystem.js"

const levelStore = useLevelStore() // håller koll på om level up notisen ska visas
const showLevelUp = ref(false)

// kollar om nivån ändras, om den gör det så visas notisen
watch(() => levelStore.level, () => {
  showLevelUp.value = true
    setTimeout(() => {
    showLevelUp.value = false
  }, 3000)  // stängs efter 3 sek
})
// stänger notisen när man klickar på X
function closeLevelUp() {
  showLevelUp.value = false
}
</script>

<style scoped>
.popup {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #fddb5d;
  color: #1f1f1f;
  padding: 14px 18px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  gap: 12px;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 700;
  padding: 0;
}
@media (max-width: 768px) {
  .popup {
    left: 50%;
    right: auto;
    bottom: 16px;
    transform: translateX(-50%);
    
    width: 90%;
    max-width: none;
    
    font-size: 0.9rem;
    padding: 12px 14px;
  }
}
.popup span {
  flex: 1;
}
</style>