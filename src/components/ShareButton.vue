<template>
  <button @click="share" class="share-btn">
    <img src="../assets/img/share.png" alt="Share" class="share-icon" />
  </button>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
      v-if="showToast"
      class="toast show align-items-center text-white bg-primary border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">Link copied!</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          aria-label="Close"
          @click="showToast = false"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showToast = ref(false);

async function share() {
  const url = window.location.href; //Hämtar nuvarande sidans URL
  try {
    await navigator.clipboard.writeText(url); //Kopierar URL till Clipboard
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  } catch (error) {
    console.error("Could not copy Link:", error);
  }
}
</script>

<style lang="scss" scoped>
.share-btn {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}
.share-icon {
  width: 26px;
  height: 26px;
}
@media (max-width: 576px) {
  .share-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
