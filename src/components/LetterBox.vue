<script setup>
//Denna fångar upp propsen och säger vad för typ de ska vara
//Letter bokstaven som visas i rutan
//color vilken färg rutan ska ha
const props = defineProps({
  letter: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="letter-box d-flex align-items-center justify-content-center text-uppercase border border-2 transition"
    :class="{
      //Standard tom eller vit
      'bg-white text-dark border-light': !color || color === 'white',
      //Bokstaven finns inte i ordet
      'border-secondary bg-secondary text-white': color == 'gray',
      //Bokstaven är rätt och på rätt plats
      'border-success bg-success text-white': color == 'green',
      //Bokstaven finns men är på fel plats
      'border-warning bg-warning text-white': color == 'yellow',
    }"
  >
    {{ letter }}
  </div>
</template>
<style scoped>
.letter-box {
  width: 100%;
  aspect-ratio: 1 / 1;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1;
}

@media (max-width: 410px) {
  .letter-box {
    font-size: 0.85rem;
  }
}

@media (min-width: 768px) {
  .letter-box {
    font-size: 1.6rem;
  }
}
</style>
