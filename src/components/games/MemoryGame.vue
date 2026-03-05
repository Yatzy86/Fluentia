<template>
    <div>
        <h1>Memory Game</h1>
        <div class="grid">
        <div
            v-for="card in cards"
            :key="card.id"
            @click="flipCard(card)"
            class="card">
            <img v-if="!card.isFlipped && !card.isMatched" src="../../assets/img/MemoryCard.png" style="width:50px; height:50px;"/>
            <span v-else>{{ card.word }}</span>
        </div>
    </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import wordPairs from '../../data/words.js'

// all info som spelet håller koll på
const cards = ref ([])  // alla kort 
const flippedCards = ref([]) // de kort som är vuppvändat
const isLocked= ref(false) // stoppar klick medan vi kollar ett par

// körs en gång när siddan laddas
onMounted(()=>{ 
    setupCards()

})

// Gör om orden till kort och blanda dem
function setupCards() {
    cards.value = wordPairs.map(pair => ({
        ...pair,
        isFlipped: false,
        isMatched: false,
    }))
    shuffle(cards.value)
}

// blandar korten randomly
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr [i], arr[j]] = [arr[j], arr [i]] // byter plats på två kort
    }
}

// körs när du klickar på ett kort
function flipCard(card) {
    //görs ingenting om spelet är låst, kortet redan vänt eller matchat
    if (isLocked.value || card.isFlipped || card.isMatched) return

    card.isFlipped= true
    flippedCards.value.push(card)

    // när två kort är vänt, kolla om de matchar
    if (flippedCards.value.length === 2) {
        checkMatch()
    }
}

// kollar om de två uippvända korten har samma pairId
function checkMatch() {
    isLocked.value = true
    const [a, b] = flippedCards.value

    if (a.pairId === b.pairId) {
        // rätt! markera båda som matchade
        a.isMatched = true
        b.isMatched = true
        flippedCards.value = []
        isLocked.value = false 
    } else {
        // fel, vänds tillabaka efter några sekunder
        setTimeout(() => {
            a.isFlipped = false
            b.isFlipped = false
            flippedCards.value = []
            isLocked.value = false
        }, 1000)
    }
}
</script>

<style scoped>
.grid  {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: 400px;
}

.card {
    width: 80px;
    height: 80px;
    border: 2px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #2a5298;
    color: white;
    font-weight: bold;
    border-radius: 8px;
}
</style>
