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
        path: "/sports/:id",
        name: "sport-details",
        component: () => import("./components/SportDetails.vue"),
    },
    {
        path: "/add",
        name: "add",
        component: () => import("./components/AddSport.vue"),
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("./components/Admin.vue")
    },
];
// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     alias: "/clubs",
//     name: "clubs",
//     // component: () => import("./components/ClubsList.vue"),
//     component: () => import("./components/ClubTable.vue"),
//   },
//   {
//     path: "/clubs/:id",
//     name: "club-details",
//     component: () => import("./components/ClubDetails.vue"),
//   },
//   {
//     path: "/add",
//     name: "add",
//     component: () => import("./components/AddClub.vue"),
//   },
// ];

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     alias: "/courses",
//     name: "courses",
//     // component: () => import("./components/CoursesList.vue"),
//     component: () => import("./components/CourseTable.vue"),
//   },
//   {
//     path: "/courses/:id",
//     name: "course-details",
//     component: () => import("./components/CourseDetails.vue"),
//   },
//   {
//     path: "/add",
//     name: "add",
//     component: () => import("./components/AddCourse.vue"),
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     alias: "/majors",
//     name: "majors",
//     // component: () => import("./components/MajorsList.vue"),
//     component: () => import("./components/MajorTable.vue"),
//   },
//   {
//     path: "/courses/:id",
//     name: "course-details",
//     component: () => import("./components/MajorDetails.vue"),
//   },
//   {
//     path: "/add",
//     name: "add",
//     component: () => import("./components/AddMajor.vue"),
//   },
// ];
// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     alias: "/majors",
//     name: "majors",
//     // component: () => import("./components/StudentsList.vue"),
//     component: () => import("./components/StudentTable.vue"),
//   },
//   {
//     path: "/courses/:id",
//     name: "course-details",
//     component: () => import("./components/StudentDetails.vue"),
//   },
//   {
//     path: "/add",
//     name: "add",
//     component: () => import("./components/AddStudent.vue"),
//   },
// ];

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
