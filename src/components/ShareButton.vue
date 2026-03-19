<template>
  <button @click="share" class="share-btn">
    <img src="../assets/img/share.png" alt="Share" class="share-icon" />
  </button>
</template>

<script setup>
async function share() {
  const url = window.location.href; //Hämtar nuvarande sidans URL
  if (navigator.share) //Kollar om webbläsaren stödjer Web Share API
  {
    await navigator.share({ url }); // Öppnar dela fuktionen (t.ex dela via appar på mobil)
  } else {
    //Om web share API funkar inte
    await navigator.clipboard.writeText(url); //Kopierar URL till Clipboard
    alert("Link copied!"); //Visas en pop up som säger att länken är kopierad
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
