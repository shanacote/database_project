<template>
    <!-- <teleport to="#modals">
        <div v-if="showModal" class="modal"> -->
            <div v-if="currentCourse.course_id" class="edit-form">
                <h4>Course</h4>
                <form>
                <div class="mb-4">
                    <label for="school_code">School Code</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="school_code"
                    v-model="currentCourse.school_code"
                    />
                </div>
                <div class="mb-4">
                    <label for="Major_id">Major ID</label>
                    <!-- <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="Major_id"
                    v-model="currentCourse.Major_id"
                    /> -->
                    <select id="major_id" v-model="currentCourse.major_id" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded">
                        <option v-for="option in majorOptions.options" :value="option.value" :key="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="course_code">Course Code</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="course_code"
                    v-model="currentCourse.course_code"
                    />
                </div>
                <div class="mb-4">
                    <label for="name">Name</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="name"
                    v-model="currentCourse.name"
                    />
                </div>

                </form>


                <!-- <button class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-red-600 text-white hover:bg-red-700 mr-2" @click="deleteCourse">
                Delete
                </button> -->

                <button type="submit" class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500 text-white hover:green-600" @click="updateCourse">
                Save
                </button>
                <p>{{ message }}</p>
            </div>

            <div v-else>
                <br />
                <p>Please click on a Course...</p>
            </div>
        <!-- </div>
    </teleport> -->
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import CourseDataService from "@/services/CourseDataService";
import Course from "@/types/Course";
import MajorDataService from "@/services/MajorDataService";
import Major from "@/types/Major";
import ResponseData from "@/types/ResponseData";

const majorOptions = reactive({
    options:[] as Array<Major>
});

export default defineComponent({
    name: "course",
    props: {
        currentCourseId: String,
    },
    data() {
        return {
            majorOptions,
            currentCourse: {} as Course,
            showModal: true,
            message: "",
        };
    },
    emits: ['doneUpdate'],
    methods: {
        getCourse(id: any) {
            CourseDataService.get(id)
                .then((response: ResponseData) => {
                    this.currentCourse = response.data;
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.error(e);
                });
        },


        updateCourse() {
            CourseDataService.update(this.currentCourse.course_id, this.currentCourse)
            .then((response: ResponseData) => {
                console.log(response.data);
                this.message = "The course was updated successfully!";
                this.$emit('doneUpdate');
            })
            .catch((e: Error) => {
                console.error(e);
                this.$emit('doneUpdate');
            });
        },

        // deleteCourse() {
        //     CourseDataService.delete(this.currentCourse.course_id)
        //         .then((response: ResponseData) => {
        //             console.log(response.data);
        //             this.$router.push({ name: "courses" });
        //         })
        //         .catch((e: Error) => {
        //             console.log(e);
        //         });
        // },
    },
    mounted() {
        this.message = "";
        this.getCourse(this.$route.params.id||this.$props.currentCourseId);
    },
    dismount() {
        this.showModal=false;
    }
});
MajorDataService.getAll().then((response: ResponseData) => {
    majorOptions.options=response.data.map((e:any)=>{return {value:e.major_id, text:e.name}});
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 400px;
    width: 400px;
    background: gray;
    text-align: center;
}
</style>