<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="mb-4">
        <label for="gender">Gender</label>
        <input
          type="text"
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="gender"
          required
          v-model="sport.gender"
          name="gender"
        />
      </div>

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
      </div>

      <button @click="saveSport" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600" @click="newSport">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SportDataService from "@/services/SportDataService";
import Sport from "@/types/Sport";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: "add-sport",
    data() {
        return {
            sport: {
                sport_id: 0,
                gender: "",
                sport: "",
                season: "",
            } as Sport,
            submitted: false,
        };
    },
    emits: ['doneUpdate'],
    methods: {
        saveSport() {
            let data = {
                gender: this.sport.gender,
                sport: this.sport.sport,
                season: this.sport.season,
            };

            SportDataService.create(data).then((response: ResponseData) => {
                this.sport.sport_id = response.data.sport_id;
                console.log(response.data);
                this.submitted = true;
                this.$emit('doneUpdate');
            }).catch((e: Error) => {
                console.log(e);
                this.$emit('doneUpdate');
            });
        },

        newSport() {
            this.sport = {} as Sport;
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