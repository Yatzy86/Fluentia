import { createRouter, createWebHashHistory } from "vue-router";
import GameView from "./views/GameView.vue";
import HomeView from "./views/HomeView.vue";
import DictionaryView from "./views/DictionaryView.vue";
import GlossaryView from "./views/GlossaryView.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { component: GameView, path: "/game/:name", props: true, name: "game" },
    { component: HomeView, path: "/", name: "home" },
    { component: DictionaryView, path: "/dictionary" },
    { component: GlossaryView, path: "/glossary" },
  ],
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});
