<template>
           <BModal
    v-model="showInstructions"
    ok-title="Got it"
    title="Instructions!"
    cancel-title="Go Back"
    @cancel="goBackHome"
    @ok="closeInstructions"
  >
    <div class="instructions-box">
      <p>1. Click two cards to flip them.</p>
      <p>2. If they match they stay open.</p>
      <p>3. If not they flip back.</p>
      <p>4. Match all pairs to win.</p>
      <p>5. Good luck!!</p>
    </div>
  </BModal>

  <div class="Memory">
    <h1>Memory Game</h1>
    <p class="Score">
      Score: {{ matchedPairs }} / {{ totalPairs }}
      <span v-if="totalXP > 0" class="xp">+{{ totalXP }} XP</span>
    </p>
    <div class="grid">
      <div
        v-for="card in cards"
        :key="card.id"
        @click="flipCard(card)"
        class="card"
        :class="{ flipped: card.isFlipped, matched: card.isMatched }">
        <!--flipped card trasnition-->
        <div class="card-inner">
          <!--flipped card trasnition-->
          <div class="card-front">
            <img
              src="../../assets/img/MemoryCard.png"
              style="width: 100px; height: 100px"
            />
          </div>
          <!--flipped card trasnition-->
          <div class="card-back">
            <span>{{ card.word }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="controls">
      <button class="btn" @click="newGame">New Game</button>
      <button class="btn outline" @click="restart">Restart</button>
    </div>
    <p v-if="hasWon" class="win">You found all the pairs! Congrats!</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import wordPairs from "../../data/words.js";
import { useLevelStore } from "../LevelSystem.js"
const levelStore = useLevelStore()
// all info som spelet håller koll på
const cards = ref([]); // alla kort
const flippedCards = ref([]); // de kort som är vuppvändat
const isLocked = ref(false); // stoppar klick medan vi kollar ett par
const matchedPairs = ref(0); // visar hur många kort man har matchad
const showInstructions = ref(true);


const totalPairs = computed(
  () => new Set(cards.value.map((c) => c.pairId)).size,
);
const hasWon = computed(
  () => matchedPairs.value > 0 && matchedPairs.value === totalPairs.value,
);
const totalXP = ref(0);

// körs en gång när siddan laddas
onMounted(() => {
  setupCards();
});

// Gör om orden till kort och blanda dem
function setupCards() {
  cards.value = getRandomPairs(8).map((pair) => ({
    ...pair,
    isFlipped: false,
    isMatched: false,
  }));
  shuffle(cards.value);
}

// blandar korten randomly
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // byter plats på två kort
  }
}

// körs när du klickar på ett kort
function flipCard(card) {
  //görs ingenting om spelet är låst, kortet redan vänt eller matchat
  if (isLocked.value || card.isFlipped || card.isMatched) return;

  card.isFlipped = true;
  flippedCards.value.push(card);

  // när två kort är vänt, kolla om de matchar
  if (flippedCards.value.length === 2) {
    checkMatch();
  }
}

// kollar om de två uippvända korten har samma pairId
function checkMatch() {
  isLocked.value = true;
  const [a, b] = flippedCards.value;

  if (a.pairId === b.pairId) {
    // rätt! markera båda som matchade
    a.isMatched = true;
    b.isMatched = true;
    matchedPairs.value++;
    totalXP.value += 10;
    levelStore.addXP(125) //// LEVEL SYSTEM!!   xp för varje rätt svar. (100xp)
    flippedCards.value = [];
    isLocked.value = false;
  } else {
    // fel, vänds tillabaka efter några sekunder
    setTimeout(() => {
      a.isFlipped = false;
      b.isFlipped = false;
      flippedCards.value = [];
      isLocked.value = false;
    }, 1000);
  }
}

function newGame() {
  matchedPairs.value = 0;
  flippedCards.value = [];
  isLocked.value = false;
  totalXP.value = 0;
  setupCards();
}

function restart() {
  matchedPairs.value = 0;
  flippedCards.value = [];
  isLocked.value = false;
  totalXP.value = 0;
  cards.value.forEach((c) => {
    c.isFlipped = false;
    c.isMatched = false;
  });
}

// vi använder 8 ord istället för alla som vi har i word.js
function getRandomPairs(amount) {
  const ids = [...new Set(wordPairs.map((w) => w.pairId))];
  shuffle(ids);
  const selected = ids.slice(0, amount);
  return wordPairs.filter((w) => selected.includes(w.pairId));
}
</script>

<style lang="scss" scoped>

$color-1: #fdc921;
$color-2: #fdd85d;
$color-3: #fffdf5;
$color-4: #99d6ea;
$color-5: #6798c0;

:deep(.modal-title) {
  font-weight: 800;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.78);
  text-transform: uppercase;
}


:deep(.modal-header) {
  background: $color-1;
  text-align: center;
  border-bottom: 3px solid $color-5;
  padding: 14px 16px;
}
:deep(.modal-content) {
  border-radius: 14px;
  border: 2px solid $color-4;
  background-color: $color-3;
  overflow: hidden;
}
.instructions-box {
  background: $color-3;
  padding: 16px;
  border-radius: 12px;
  border: 2px dashed $color-4;
  position: relative;
}
.instructions-box p {
  background: $color-2;
  padding: 8px 12px;
  border-radius: 8px;
  margin: 8px 0;
  border-left: 4px solid $color-4;
  font-weight: 500;
}

/* huvud container för memory spelet */
.memory-container {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background-color: #214373;
  border-radius: 24px;
  padding: 36px 32px 28px;
  box-sizing: border-box;
}

/* titel på spelet */
h1 {
  text-align: center;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 10px 0;
}

/* score text */
.Score {
  text-align: center;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 24px 0;
  background: transparent;
}

/* grid som håller alla kort */
.grid {
  max-width: 560px;
  margin: 0 auto;
  background-color: #315e9d; /* ljusare bakom korten */
  border-radius: 10px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 kort per rad */
  gap: 14px; /* space mellan kort */
  box-sizing: border-box;
}

/* varje kort */
.card {
  width: 100%;
  aspect-ratio: 1 / 1; /* gör kortet kvadrat */
  cursor: pointer;
  perspective: 600px; /* behövs för flip animation */
  background: transparent;
  border: none;
  border-radius: 10px;
  padding: 0;
  margin: 0;
  max-width: unset;
}

/* liten hover effekt när man håller musen över kortet */
.card:hover .card-inner {
  transform: translateY(-2px);
}

/* när kortet är flipped eller matchat roteras det */
.card.flipped .card-inner,
.card.matched .card-inner {
  transform: rotateY(180deg);
}

/* inner del av kortet som roterar */
.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d; /* gör 3d flip möjligt */
  transition: transform 0.4s ease; /* animation */
  border-radius: 10px;
  background: transparent;
  padding: 0;
  margin: 0;
  max-width: unset;
}

/* fram och baksida av kortet */
.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* gömmer sidan som inte syns */
  -webkit-backface-visibility: hidden;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center; /* centrerar innehåll */
  box-sizing: border-box;
  overflow: hidden;
  padding: 0;
  margin: 0;
  max-width: unset;
}

/* framsidan av kortet */
.card-front {
  background-color: #214373;
}

/* bilden på framsidan */
.card-front img {
  width: 52px;
  height: 52px;
  object-fit: contain;
}

/* baksidan där ordet visas */
.card-back {
  background-color: #fddb5d;
  transform: rotateY(180deg); /* gör så att den visas när kortet flippar */
  padding: 8px;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  color: #1f1f1f;
}

/* span runt ordet */
.card-back span {
  display: inline-block;
  width: 100%;
  background-color: #fddb5d;
  border-radius: 8px;
  padding: 14px 8px;
  color: #1f1f1f;
  font-weight: 700;
}

/* färg när kort är matchade */
.card.matched .card-back {
  background-color: #86efac;
}

.card.matched .card-back span {
  background-color: #86efac;
}

/* knappar under spelet */
.controls {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
  background: transparent;
  padding: 0;
  max-width: unset;
  border-radius: 0;
}

/* knapp style */
.btn {
  background-color: #fddb5d;
  color: #1f1f1f;
  border: none;
  border-radius: 8px;
  padding: 12px 26px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  max-width: unset;
}

/* liten hover effekt på knappar */
.btn:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}

/* vit knapp variant */
.btn.outline {
  background-color: #ffffff;
}

/* win text när spelet är klart */
.win {
  margin: 20px auto 0;
  text-align: center;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  background: transparent;
  max-width: unset;
}

/* vanlig paragraf */
p {
  background: transparent;
  max-width: unset;
  margin: 0;
  padding: 0;
}

p.Score {
  margin: 0 0 24px 0;
}

p.win {
  margin: 20px auto 0;
}

/* XP text */
.Memory p:last-child {
  text-align: center;
  color: #59e36f;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 14px;
}

.xp {
  color: #59e36f;
  margin-left: 12px;
  font-weight: 700;
}

/* mobil version (responsive) */
@media (max-width: 768px) {
  .memory-container {
    padding: 24px 20px 20px;
    border-radius: 18px;
  }

  .grid {
    max-width: 100%;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 16px;
  }

  .card-front img {
    width: 42px;
    height: 42px;
  }

  .card-back {
    font-size: 0.9rem;
  }

  .card-back span {
    padding: 10px 6px;
    font-size: 0.9rem;
  }

  .controls {
    gap: 12px;
  }

  .btn {
    padding: 10px 18px;
    font-size: 0.95rem;
  }
}
@media (max-width: 480px) {
  .memory-container {
    padding: 18px 14px 16px;
    border-radius: 14px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .Score {
    font-size: 0.95rem;
    margin-bottom: 18px;
  }

  .grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 12px;
  }

  .card-front img {
    width: 36px;
    height: 36px;
  }

  .card-back {
    font-size: 0.8rem;
    padding: 6px;
  }

  .card-back span {
    padding: 8px 4px;
    font-size: 0.8rem;
  }

  .controls {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .btn {
    width: 100%;
    max-width: 220px;
  }

  .xp {
    display: block;
    margin-left: 0;
    margin-top: 6px;
  }
}

</style>
