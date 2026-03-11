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
];

let imgCount = ref(0);
let currentImg = ref(imgSrc[0]);

function changeImg() {
  imgCount.value++;
  console.log(imgCount.value);

  if (imgCount.value % 2 !== 0) {
    currentImg.value = imgSrc[imgCount.value];
    console.log("gif");

    setTimeout(function () {
      imgCount.value++;
      currentImg.value = imgSrc[imgCount.value];
      console.log("jpg");
    }, 900);
  }
}
</script>

<template>
  <h1>Hangman</h1>
  <img width="700" :src="currentImg" alt="" />
  <BButton @click="changeImg">Wrong Answer</BButton>
</template>
