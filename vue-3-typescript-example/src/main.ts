import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css";
import FontAwesomeIcon from "@/fontawesome-icons";


createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount("#app");
// createApp(App).mount("#app");
