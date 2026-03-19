<script setup>
//Array med all spelinfo och länkar till sidan
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
    <h2 class="section-title"><span>Game Selection</span></h2>
    <!-- bootstrap kort med v-for för att rendera ut länkarna på sidan -->
    <b-card-group deck id="game-list">
      <div v-for="game in gameList" :key="game.name">
        <!-- Skickar in prop(params) med länkarna som används i Gameview -->
        <RouterLink :to="{ name: 'game', params: { name: game.name } }">
          <b-card
            variant="third"
            :title="game.title"
            :img-src="game.img"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2 game-card"
          >
            <b-card-text>{{ game.description }}</b-card-text>

            <b-button variant="fourth">Start</b-button>
          </b-card></RouterLink
        >
      </div>

      <!-- Tomt kort som visar att mer spel kommer snart -->
      <RouterLink to="#">
        <b-card
          variant="third"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2 game-card"
        >
          <b-card-text>Coming soon...</b-card-text>
        </b-card>
      </RouterLink>
    </b-card-group>
  </section>
</template>
