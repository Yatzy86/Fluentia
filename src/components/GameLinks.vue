<script setup>
//lägg till kommentarer!

const gameList = [
  {
    title: "Memory",
    name: "memory",
    img: "https://picsum.photos/600/300/?image=25",
    description: "Pair words with memory",
  },
  {
    title: "Choice Quiz",
    name: "choicequiz",
    img: "https://picsum.photos/600/300/?image=25",
    description: "Answer multiple choice questions",
  },
  {
    title: "Hangman",
    name: "hangman",
    img: "https://picsum.photos/600/300/?image=25",
    description: "Guess the word before the stickman is hanged",
  },
  {
    title: "Word Search",
    name: "wordsearch",
    img: "https://picsum.photos/600/300/?image=25",
    description: "Search and find all the hidden words",
  },
];
</script>

<template>
  <section>
    <b-card-group deck id="game_list">
      <div v-for="game in gameList" :key="game.name">
        <RouterLink :to="{ name: 'game', params: { name: game.name } }">
          <b-card
            :title="game.title"
            :img-src="game.img"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2 game_card"
          >
            <b-card-text>{{ game.description }}</b-card-text>

            <b-button variant="primary">Start</b-button>
          </b-card></RouterLink
        >
      </div>

      <RouterLink to="#">
        <b-card
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2 game_card"
        >
          <b-card-text>Coming soon...</b-card-text>
        </b-card>
      </RouterLink>
    </b-card-group>
  </section>
</template>
