<template>
  <div class="list flex flex-wrap ">
    <div class="md:w-2/3 pr-4 pl-4">
      <div class="relative flex items-stretch w-full mb-3">
        <input
          type="text"
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          placeholder="Search by title"
          v-model="gender"
        />
        <div class="input-group-append">
          <button
            class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-gray-600 border-gray-600 hover:bg-gray-600 hover:text-white bg-white hover:bg-gray-700"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="md:w-1/2 pr-4 pl-4">
      <h4>Sports List</h4>
      <ul class="flex flex-col pl-0 mb-0 border rounded border-gray-300">
        <li
          class="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
          :class="{ active: index == currentIndex }"
          v-for="(sport, index) in sports"
          :key="index"
          @click="setActiveSport(sport, index)"
        >
          {{ sport.sport_id }}, {{ sport.gender }}, {{ sport.sport }}, {{ sport.season }}
        </li>
      </ul>

      <button class="m-6 inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline py-1 px-2 leading-tight text-xs  bg-red-600 text-white hover:bg-red-700" @click="removeAllSports">
        Remove All
      </button>
    </div>
    <div class="md:w-1/2 pr-4 pl-4">
      <div v-if="currentSport.sport_id">
        <h4>Sport</h4>
        <div>
          <label><strong>ID:</strong></label> {{ currentSport.sport_id }}
        </div>
        <div>
          <label><strong>Gender:</strong></label> {{ currentSport.gender }}
        </div>
        <div>
          <label><strong>Sport:</strong></label>{{ currentSport.sport }}
        </div>
        <div>
          <label><strong>Season:</strong></label>{{ currentSport.season }}
        </div>

        <router-link
          :to="'/sports/' + currentSport.sport_id"
          class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-orange-400 text-black hover:bg-orange-500"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Sport...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SportDataService from "@/services/SportDataService";
import Sport from "@/types/Sport";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "sports-list",
  data() {
    return {
      sports: [] as Sport[],
      currentSport: {} as Sport,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveSports() {
      SportDataService.getAll()
        .then((response: ResponseData) => {
          this.sports = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveSports();
      this.currentSport = {} as Sport;
      this.currentIndex = -1;
    },

    setActiveSport(sport: Sport, index = -1) {
      this.currentSport = sport;
      this.currentIndex = index;
    },

    removeAllSports() {
      SportDataService.deleteAll()
        .then((response: ResponseData) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    searchTitle() {
      SportDataService.findByTitle(this.title)
        .then((response: ResponseData) => {
          this.sports = response.data;
          this.setActiveSport({} as Sport);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveSports();
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>