import { createWebHistory, createRouter } from "vue-router";
import LessonPage from "@/pages/LessonPage.vue";

const routes = [
  {
    path: "/",
    name: "LessonPage",
    component: LessonPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
