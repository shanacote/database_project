<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <!-- <TutorialTable msg="test"/> -->
  <!-- <fa icon="coffee"/> -->
  <!-- <fa icon="user-secret" /> -->
    <button type="button"><font-awesome-icon :icon="['fas', 'pencil-alt']" /></button>
  <font-awesome-icon :icon="['fas', 'pencil-alt']" />
  <font-awesome-icon :icon="['fas', 'user-secret']" />
  <div id="app">
    <nav class="relative flex flex-wrap items-center content-between py-3 px-4 flex-no-wrap content-start text-white bg-gray-900">
      <router-link to="/" class="inline-block pt-1 pb-1 mr-4 text-lg whitespace-no-wrap">bezKoder</router-link>
      <div class="flex flex-wrap list-reset pl-0 mb-0 mr-auto">
        <li class="">
          <router-link to="/sport" class="inline-block py-2 px-4 no-underline">Sports</router-link>
        </li>
        <li class="">
          <router-link to="/add" class="inline-block py-2 px-4 no-underline">Add</router-link>
        </li>
      </div>
    </nav>

    <div class="container mx-auto sm:px-4 mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
// import TutorialTable from "./components/TutorialTable.vue";

export default defineComponent({
  name: "App",
  components: {
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
