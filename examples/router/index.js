import { createRouter, createWebHistory } from 'vue-router'
import routes from "./routes.js";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  next()
});

export default router;
