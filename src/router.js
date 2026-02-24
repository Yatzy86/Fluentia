import { createRouter, createWebHashHistory } from "vue-router";
<<<<<<< HEAD
//import AboutView from "./views/AboutView.vue";
//import ContactView from "./views/ContactView.vue";
=======
import GameView from "./views/GameView.vue";
>>>>>>> d2fe403a2c914e6d3359dda5fd5a7f33510a4625
import HomeView from "./views/HomeView.vue";
import DictionaryView from "./views/DictionaryView.vue";
//import GamesView from "./views/GamesView.vue";
export default createRouter({
  history: createWebHashHistory(),
  routes: [
<<<<<<< HEAD
    // { component: AboutView, path: "/about" },
    //{ component: ContactView, path: "/contact" },
=======
    { component: GameView, path: "/game/:name", props: true, name: "game" },
>>>>>>> d2fe403a2c914e6d3359dda5fd5a7f33510a4625
    { component: HomeView, path: "/" },
    { component: DictionaryView, path: "/dictionary" },
    //{ component: GamesView, path: "/games" },
  ],
});
