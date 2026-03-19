<script setup>
import speakIcon from "../assets/img/speak.png";
import readIcon from "../assets/img/read.png";
import understandIcon from "../assets/img/understand.png";
import writeIcon from "../assets/img/write.png";

const iconList = [
  {
    title: "Speak",
    img: speakIcon,
  },
  {
    title: "Read",
    img: readIcon,
  },
  {
    title: "Understand",
    img: understandIcon,
  },
  {
    title: "Write",
    img: writeIcon,
  },
];
</script>

<template>
  <h2 class="section-title"><span>What will you improve?</span></h2>
  <section
    id="improve-section"
    class="d-flex justify-content-around align-items-center"
  >
    <div
      v-for="icon in iconList"
      :key="icon.title"
      class="d-flex flex-column justify-content-center align-items-center"
    >
      <img width="50px" :src="icon.img" alt="" />
      <h3 class="fw-bold">{{ icon.title }}</h3>
    </div>
  </section>
</template>
