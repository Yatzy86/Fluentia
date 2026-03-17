import { defineStore } from "pinia"
import { ref, computed } from "vue"


export const useLevelStore = defineStore("level", () => {
 
    // hämtar sparad xp från localStorage, om det inte finns börjar vi på 0
    const xp = ref(Number(localStorage.getItem("xp")) || 0)

        // hämtar sparad nivå från localStorage, om det inte finns börjar vi på nivå 1
    const level = ref(Number(localStorage.getItem("level")) || 1)
 
    // hur mycket xp man behöver för att gå upp en nivå (inte klar än, jag behöver fixa den..)
    const xpNeeded = 100
        const currentXP = computed(() => xp.value % xpNeeded)
 
    // räknar ut hur många procent av xp-baren som ska vara fylld (0-100)
    const xpPercent = computed(() => Math.floor((currentXP.value / xpNeeded) * 100))
    // den här funktionen anropas när man får ett rätt svar i ett spel
    function addXP(amount) {
        xp.value += amount // lägger till xp på den totala xp   
        const newLevel = Math.floor(xp.value / xpNeeded) + 1 // räknar ut vilken nivå man ska vara på baserat på total xp
        if (newLevel > level.value) {  // om den nya nivån är högre än nuvarande nivå, uppdatera nivån
            level.value = newLevel
        }
        localStorage.setItem("xp", xp.value)    // sparar den uppdaterade xp i localStorage så det finns kvar nästa gång man öppnar sidan
        localStorage.setItem("level", level.value) // sparar den uppdaterade nivån i localStorage.

        // test
        console.log("XP:", xp.value)
         console.log("Nivå:", level.value)
    }
     // returnerar allt som andra komponenter får använda från den här store
    return { xp, level, currentXP, xpNeeded, xpPercent, addXP }
})