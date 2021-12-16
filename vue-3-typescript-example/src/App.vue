<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <!-- <TutorialTable msg="test"/> -->

    <div id="app">
        <div class="py-10">
            <nav class="bg-gray-100 h-10 fixed top-0 left-0 right-0" style="z-index:100">
                <div class="max-w-6x1 mx-auto px-4">
                    <div class="flex justify-between">
                        <div class="flex space-x-4">
                            <router-link to="/" class="hidden md:flex items-center inline-block pt-1 pb-1 mr-4 text-lg whitespace-no-wrap">
                                <img src="./assets/ram.jpg" class="h-8 w-8" alt="Suffolk University"/>
                                <span class="font-semibold text-xl tracking-tight">Suffolk University</span>
                            </router-link>

                            <!-- <img src="./assets/ram.jpg" class="h-8 w-8 mr-2" alt="Suffolk University"/>
                        <span class="font-semibold text-xl tracking-tight">Suffolk University</span> -->
                            <router-link to="/admin" class="flex items-center inline-block py-2 no-underline">Admin</router-link>
                            <!-- <div class="flex items-center"><span>primary</span></div>
                            <div class="flex items-center"><span>second</span></div> -->
                            <!-- <div class="hidden md:flex items-center space-x-1">
                            </div> -->
                        </div>
                        <!-- <div class="flex space-x-4"> -->
                            <div v-if="currentUser" class="hidden md:flex items-center">
                                <button type="button" @click="handleLogoutClick()" class=" px-3 bg-yellow-400 text-yellow-900 rounded hover:bg-yellow-300 hover:text-gray-900">
                                    <font-awesome-icon :icon="['fas', 'sign-out-alt']" /> LogOut
                                </button>
                            </div>
                            <div class="mobile-menu-button md:hidden items-center">
                                <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                                    <font-awesome-icon :icon="['fas', 'bars']" />
                                    <!-- <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg> -->
                                </button>
                            </div>
                        <!-- </div> -->

                    </div>
                </div>
                <div class="mobile-menu hidden md:hidden">
                    <div class="bock text-sm">logo</div>
                    <div class="bock text-sm">primary</div>
                    <div class="bock text-sm">second</div>
                    <div v-if="currentUser" class="">
                        <button type="button" @click="handleLogoutClick()">
                            <font-awesome-icon :icon="['fas', 'sign-out-alt']" /> LogOut
                        </button>
                    </div>
                </div>
            </nav>



            <!-- https://tailwindcss.com/docs/utility-first -->
            <div v-if="currentUser" class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-10">
                <div class="flex-shrink-0">
                    <img src="./assets/ram.jpg" class="h-12 w-12" alt="Suffolk University"/>
                </div>
                <div>
                    <div class="text-xl font-medium text-black">Suffolk University</div>
                    <p class="text-gray-500">Welcome to suffolk university! </p>
                    <p class="text-gray-500">Are you looking to get involved or see what is offered at this school?</p>
                </div>
            </div>

            <!-- <div v-if="!currentUser" class="navbar-nav ml-auto">
                <li class="nav-item">
                    <Login />
                </li>
            </div>
 -->
            <!-- <nav class="relative flex flex-wrap items-center content-between py-3 px-4 flex-no-wrap content-start text-white bg-gray-900">
                <router-link to="/" class="inline-block pt-1 pb-1 mr-4 text-lg whitespace-no-wrap">Home</router-link>
                <div class="flex flex-wrap list-reset pl-0 mb-0 mr-auto">
                    <li class="">
                        <router-link to="/sport" class="inline-block py-2 px-4 no-underline">Sports</router-link>
                    </li>
                    <li class="">
                        <router-link to="/add" class="inline-block py-2 px-4 no-underline">Add</router-link>
                    </li>
                </div>
                <li class="nav-item">
                    <a class="nav-link" @click.prevent="logOut">
                        <font-awesome-icon icon="sign-out-alt" /> LogOut
                    </a>
                </li>
            </nav> -->

            <div class="container mx-auto sm:px-2 mt-3">
                <router-view />
            </div>
        </div>
    </div>

    <!-- https://www.youtube.com/watch?v=TYcNDRav-N4 -->
    <div id=modals></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from 'vuex'
// import Login from "./components/Login.vue";
// import HelloWorld from "./components/HelloWorld.vue";
// import TutorialTable from "./components/TutorialTable.vue";

export default defineComponent({
    name: "App",
    setup(props, context) {
        const store=useStore();
        return {
            getStore:function() {
                return store;
            }
        }
    },
    methods: {
        handleLogoutClick:function() {
            const store=this.getStore();
            store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    },
    mounted() {
        const mobileMenuButton=document.querySelector(".mobile-menu-button");
        mobileMenuButton?.addEventListener("click", () => {
            const mobileMenu=document.querySelector(".mobile-menu");
            mobileMenu?.classList.toggle("hidden");
        });
    },
    computed: {
        currentUser() {
            const store=useStore();
            return store.state.auth.user;
        },
    },
    components: {
        // Login,
        // HelloWorld,
        // TutorialTable
    }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
