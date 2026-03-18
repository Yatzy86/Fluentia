import { defineStore } from "pinia"
import { ref, computed } from "vue"


export const useLevelStore = defineStore("level", () => {
 
    // hämtar sparad xp från localStorage, om det inte finns börjar vi på 0
    const xp = ref(Number(localStorage.getItem("xp")) || 0)
        // hämtar sparad nivå från localStorage, om det inte finns börjar vi på nivå 1  
    const level = ref(Number(localStorage.getItem("level")) || 1)
 
    // UPPDATERAD: xpNeeded är nu en computed istället för ett hårdkodat tal
    // nivå 1 behöver 1000 xp, nivå 2 behöver 2000 xp, nivå 3 behöver 3000 xp osv
    const xpNeeded = computed(() => level.value * 1000)
        // UPPDATERAD: räknar ut hur mycket total xp som krävs för att nå början av en viss nivå
        // nivå 1 börjar på 0, nivå 2 börjar på 1000, nivå 3 börjar på 3000 osv
        function xpAtStartOfLevel(lvl) {
            let total = 0
            for (let i = 1; i < lvl; i++) {
                total += i * 1000
            }
            return total
        }
        // UPPDATERAD: använder xpAtStartOfLevel istället för % eftersom xpNeeded inte längre är fast
        const currentXP = computed(() => xp.value - xpAtStartOfLevel(level.value))
 
    // räknar ut hur många procent av xp-baren som ska vara fylld (0-100)
    const xpPercent = computed(() => Math.floor((currentXP.value / xpNeeded.value) * 100))
    // den här funktionen anropas när man får ett rätt svar i ett spel
    function addXP(amount) {
        xp.value += amount // lägger till xp på den totala xp   
        // UPPDATERAD: while loop istället för if, ifall man får flera levels på en gång
        while (xp.value >= xpAtStartOfLevel(level.value) + xpNeeded.value) { // kollar om man har tillräckligt med xp för att gå upp en nivå
            level.value++
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