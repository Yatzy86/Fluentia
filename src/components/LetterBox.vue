<script setup>
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
    class="d-flex align-items-center justify-content-center text-uppercase border border-2 transition"
    style="height: 4rem"
    :class="{
      'bg-white text-dark border-light': !color || color === 'white',
      'border-secondary bg-secondary text-white': color == 'gray',
      'border-success bg-success text-white': color == 'green',
      'border-warning bg-warning text-white': color == 'yellow',
    }"
  >
    {{ letter }}
  </div>
</template>
