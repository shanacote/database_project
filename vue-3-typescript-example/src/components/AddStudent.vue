<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="mb-4">
        <label for="gender">Name</label>
        <input
          type="text"
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="name"
          required
          v-model="student.name"
          name="name"
        />
      </div>

      <div class="mb-4">
        <label for="major_id">Major ID</label>
        <input
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="major_id"
          required
          v-model="student.Major_id"
          name="major_id"
        />
      </div>

      <!-- <div class="mb-4">
        <label for="season">Season</label>
        <input
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="season"
          required
          v-model="sport.season"
          name="season"
        />
      </div> -->

      <button @click="saveStudent" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600" @click="newStudent">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StudentDataService from "@/services/StudentDataService";
import Student from "@/types/Student";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "add-student",
  data() {
    return {
      student: {
        student_id: 0,
        name: "",
        major_id: 0,
      } as Student,
      submitted: false,
    };
  },
  methods: {
    saveStudent() {
      let data = {
        name: this.student.name,
        major_id: this.student.major_id,
      };

      StudentDataService.create(data)
        .then((response: ResponseData) => {
          this.student.student_id = response.data.student_id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newStudent() {
      this.student = {} as Student;
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