import { createRouter, createWebHashHistory } from "vue-router";
import GameView from "./views/GameView.vue";
import HomeView from "./views/HomeView.vue";
import DictionaryView from "./views/DictionaryView.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { component: GameView, path: "/game/:name", props: true, name: "game" },
    { component: HomeView, path: "/" },
    { component: DictionaryView, path: "/dictionary" },
  ],
});
