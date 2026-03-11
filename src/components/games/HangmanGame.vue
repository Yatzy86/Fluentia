<script setup>
import { ref } from "vue";

const imgSrc = [
  "/src/assets/img/hangman/hangman01.jpg",
  "/src/assets/img/hangman/hangman02.gif",
  "/src/assets/img/hangman/hangman03.jpg",
  "/src/assets/img/hangman/hangman04.gif",
  "/src/assets/img/hangman/hangman05.jpg",
  "/src/assets/img/hangman/hangman06.gif",
  "/src/assets/img/hangman/hangman07.jpg",
  "/src/assets/img/hangman/hangman08.gif",
  "/src/assets/img/hangman/hangman09.jpg",
  "/src/assets/img/hangman/hangman10.gif",
  "/src/assets/img/hangman/hangman11.jpg",
  "/src/assets/img/hangman/hangman12.gif",
  "/src/assets/img/hangman/hangman13.jpg",
  "/src/assets/img/hangman/hangman14.gif",
  "/src/assets/img/hangman/hangman15.jpg",
  "/src/assets/img/hangman/hangman16.gif",
  "/src/assets/img/hangman/hangman17.jpg",
  "/src/assets/img/hangman/hangman18.gif",
  "/src/assets/img/hangman/hangman19.jpg",
  "/src/assets/img/hangman/hangman20.gif",
  "/src/assets/img/hangman/hangman21.gif",
  "/src/assets/img/hangman/hangman22.gif",
];

let imgCount = ref(0);
let currentImg = ref(imgSrc[0]);
const isRunning = ref(false);

function changeImg() {
  if (isRunning.value) return;
  isRunning.value = true;

  imgCount.value++;
  console.log(imgCount.value);

  if (imgCount.value % 2 !== 0) {
    //sparar imgCount i en variabel som jag använder, så att inte användaren kan klicka medans bilderna laddar
    const currentCount = imgCount.value;
    const gifPreload = new Image();
    gifPreload.src = imgSrc[imgCount.value];

    gifPreload.onload = function () {
      currentImg.value = imgSrc[imgCount.value];

      setTimeout(function () {
        currentImg.value = imgSrc[currentCount + 1];
        //Den sparas sedan tillbaka i imgCount så att imgCount har korrekt värde igen
        imgCount.value = currentCount + 1;

        if (currentCount == 19) {
          setTimeout(function () {
            imgCount.value = currentCount + 2;
            currentImg.value = imgSrc[currentCount + 2];
            console.log(currentCount);
            isRunning.value = false;
          }, 3000);
        } else {
          isRunning.value = false;
        }
      }, 900);
    };
  }
}

if (imgCount.value >= 20) {
  currentImg.value = imgSrc[imgCount];
  setTimeout(function () {
    imgCount.value + 1;
    currentImg.value = imgSrc[imgCount];
  }, 900);
}
</script>

<template>
  <h1>Hangman</h1>
  <img width="700" :src="currentImg" alt="" />
  <BButton @click="changeImg" :disabled="isRunning">Wrong Answer</BButton>
</template>
