import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import LoginView from "../pages/LoginView.vue";
import RegisterView from "../pages/RegisterView.vue";
import TeamView from "../pages/TeamView.vue";
import GamesView from "../pages/GamesView.vue";
import GameView from "../pages/GameView.vue";
import RankingView from "../pages/RankingView.vue";
import { useAuth } from "../composables/useAuth";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/ranking", component: RankingView },
  { path: "/team", component: TeamView, meta: { requiresAuth: true } },
  { path: "/games", component: GamesView, meta: { requiresAuth: true } },
  { path: "/game", component: GameView, meta: { requiresAuth: true } },
  { path: "/game/:id", component: GameView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next("/login");
  } else {
    next();
  }
});

export default router;