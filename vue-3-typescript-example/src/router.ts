import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/sports",
    name: "sports",
    // component: () => import("./components/SportsList.vue"),
    component: () => import("./components/SportTable.vue"),
  },
  {
    path: "/sports/:id",
    name: "sport-details",
    component: () => import("./components/SportDetails.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddSport.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
