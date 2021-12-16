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
        <label for="major_id">Major ID</label>
        <select id="major_id" v-model="course.major_id" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded">
            <option v-for="option in majorOptions.options" :value="option.value" :key="option.value">
                {{ option.text }}
            </option>
        </select>
        <!-- <input
          class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
          id="major_id"
          required
          v-model="course.major_id"
          name="major_id"
        /> -->
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
import { defineComponent, reactive } from "vue";
import CourseDataService from "@/services/CourseDataService";
import Course from "@/types/Course";
import MajorDataService from "@/services/MajorDataService";
import Major from "@/types/Major";
import ResponseData from "@/types/ResponseData";

let majorSelectOptionsLoaded=false;
const majorOptions = reactive({
    options:[] as Array<Major>
});

export default defineComponent({
    name: "add-course",
    data() {
        return {
            majorOptions,
            majorSelectOptionsLoaded,
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
    emits: ['doneUpdate'],
    methods: {
        saveCourse() {
            let data = {
                // course_id: this.course.course_id,
                school_code: this.course.school_code,
                major_id: this.course.major_id,
                course_code: this.course.course_code,
                name: this.course.name,
            };

            CourseDataService.create(data).then((response: ResponseData) => {
                this.course.course_id = response.data.course_id;
                console.log(response.data);
                this.submitted = true;
                this.$emit('doneUpdate');
            }).catch((e: Error) => {
                console.log(e);
                this.$emit('doneUpdate');
            });
        },

        newCourse() {
            this.course = {} as Course;
        },
    },
    mounted() {
        majorSelectOptionsLoaded=false;
        MajorDataService.getAll().then((response: ResponseData) => {
            majorOptions.options=response.data.map((e:any)=>{return {value:e.major_id, text:e.name}});
            majorSelectOptionsLoaded=true;
        });
    },
    dismount() {
        majorSelectOptionsLoaded=true;
        this.submitted=false;
    }

});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>