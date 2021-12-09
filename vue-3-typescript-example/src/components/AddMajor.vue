<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="mb-4">
        <label for="name">Name</label>
        <input
          type="text"
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="name"
          required
          v-model="major.name"
          name="name"
        />
      </div>
<!-- 
      <div class="mb-4">
        <label for="sport">Sport</label>
        <input
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="sport"
          required
          v-model="sport.sport"
          name="sport"
        />
      </div>

      <div class="mb-4">
        <label for="season">Season</label>
        <input
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="season"
          required
          v-model="sport.season"
          name="season"
        />
      </div> -->

      <button @click="saveMajor" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600" @click="newMajor">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MajorDataService from "@/services/MajorDataService";
import Major from "@/types/Major";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "add-major",
  data() {
    return {
      major: {
        major_id: 0,
        name: "",
      } as Major,
      submitted: false,
    };
  },
  methods: {
    saveMajor() {
      let data = {
        name: this.major.name,
      };

      MajorDataService.create(data)
        .then((response: ResponseData) => {
          this.major.major_id = response.data.major_id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newMajor() {
      this.major = {} as Major;
    },
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>