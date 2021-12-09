<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="mb-4">
        <label for="school_code">School Code</label>
        <input
          type="text"
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="school_code"
          required
          v-model="course.school_code"
          name="school_code"
        />
      </div>

      <div class="mb-4">
        <label for="Major_id">Major ID</label>
        <input
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="Major_id"
          required
          v-model="course.Major_id"
          name="Major_id"
        />
      </div>

      <div class="mb-4">
        <label for="Course_code">Course Code</label>
        <input
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="course_code"
          required
          v-model="course.course_code"
          name="course_code"
        />
      </div>

      <div class="mb-4">
        <label for="name">Name</label>
        <input
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="name"
          required
          v-model="course.name"
          name="name"
        />
      </div>

      <button @click="saveCourse" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600" @click="newCourse">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CourseDataService from "@/services/CourseDataService";
import Course from "@/types/Course";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "add-course",
  data() {
    return {
      course: {
        course_id: 0,
        school_code: "",
        major_id: 0,
        course_code: "",
        name: "",
      } as Course,
      submitted: false,
    };
  },

  methods: {
    saveCourse() {
      let data = {
        course_id: this.course.course_id,
        school_code: this.course.school_code,
        Major_id: this.course.major_id,
        Course_code: this.course.course_code,
        name: this.course.name,
      };

      CourseDataService.create(data)
        .then((response: ResponseData) => {
          this.course.course_id = response.data.course_id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newCourse() {
      this.course = {} as Course;
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