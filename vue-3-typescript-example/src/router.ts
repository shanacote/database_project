import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        alias: "/summary",
        name: "summary",
        component: () => import("./components/Summary.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("./components/Login.vue"),
        // component: () => import("./components/SportTable.vue"),
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("./components/Admin.vue")
    },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Everytime a navigating action is trigger, check authorization
router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
