import { createRouter, createWebHashHistory } from "vue-router";
import GameView from "./views/GameView.vue";
import HomeView from "./views/HomeView.vue";
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { component: GameView, path: "/game/:name", props: true, name: "game" },
    { component: HomeView, path: "/" },
  ],
});
