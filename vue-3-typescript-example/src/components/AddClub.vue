<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="mb-4">
        <label for="club">Name</label>
        <input
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="name"
          required
          v-model="club.name"
          name="name"
        />
      </div>

      <div class="mb-4">
        <label for="type">Type</label>
        <input
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="type"
          required
          v-model="club.type"
          name="type"
        />
      </div>

      <button @click="saveClub" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600" @click="newClub">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClubDataService from "@/services/ClubDataService";
import Club from "@/types/Club";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: "add-club",
    data() {
        return {
            club: {
                club_id: 0,
                name: "",
                type: "",
                season: "",
            } as Club,
            submitted: false,
        };
    },
    emits: ['doneUpdate'],
    methods: {
        saveClub() {
            let data = {
                name: this.club.name,
                type: this.club.type,
            };

            ClubDataService.create(data).then((response: ResponseData) => {
                this.club.club_id = response.data.club_id;
                console.log(response.data);
                this.submitted = true;
                this.$emit('doneUpdate');
            }).catch((e: Error) => {
                console.log(e);
                this.$emit('doneUpdate');
            });
        },

        newClub() {
            this.club = {} as Club;
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