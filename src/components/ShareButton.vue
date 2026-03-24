<template>
  <!--Knapp som kör funktionen "share" när man klickar-->
  <button @click="share" class="share-btn">
    <!--Ikon för dela-->
    <img src="../assets/img/share.png" alt="Share" class="share-icon" />
  </button>
  <!--Container som placerar toasten nere till höger-->
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <!--Toast visas bara om showToast är true-->
    <div
      v-if="showToast"
      class="toast show align-items-center text-white bg-primary border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <!--Flexbox för att lägga text och knapp bredvid varandra-->
      <div class="d-flex">
        <!--Meddelandet-->
        <div class="toast-body">Link copied!</div>
        <!--Stäng-knapp (X) som gömmer toasten direkt-->
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
import { ref } from "vue"; //ref för att skapa reaktiv variabel

const showToast = ref(false); //Variabel som styr om toasten ska visas eller inte

//Funktion körs när man klickar på knappen
async function share() {
  const url = window.location.href; //Hämtar nuvarande sidans URL
  try {
    await navigator.clipboard.writeText(url); //Kopierar URL till Clipboard
    showToast.value = true; //Visar toasten

    //Gömmer toasten efter 2 sekunder
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  } catch (error) {
    // loggar fel om kopiering misslyckas
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
