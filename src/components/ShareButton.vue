<template>
  <button @click="share" class="share-btn">
    <img src="../assets/img/share.png" alt="Share" class="share-icon" />
  </button>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
      ref="toastRef"
      class="toast align-items-center text-white bg-primary border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">Link copied!</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Toast } from "bootstrap";
const toastRef = ref(null);
let toastInstance = null;
onMounted(() => {
  if (toastRef.value) {
    toastInstance = new Toast(toastRef.value, {
      delay: 2000,
    });
  }
});
async function share() {
  const url = window.location.href; //Hämtar nuvarande sidans URL
  if (navigator.share) //Kollar om webbläsaren stödjer Web Share API
  {
    //await navigator.share({ url }); // Öppnar dela fuktionen (t.ex dela via appar på mobil)
    //} else {
    //Om web share API funkar inte
    await navigator.clipboard.writeText(url); //Kopierar URL till Clipboard
    toastInstance?.show(); //Visas en pop up som säger att länken är kopierad
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
