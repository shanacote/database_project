<template>
    <div class=" flex flex-wrap ">
        <div class="md:w-1/4 pr-4 pl-4">
            <h4>Pick a Major</h4>
            <ul class="flex flex-col pl-0 mb-0 border rounded border-gray-300">
                <li
                    class="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
                    :class="{ active: index == currentMajorIndex }"
                    v-for="(major, index) in majors"
                    :key="index"
                    @click="setActiveMajor(major, index)"
                >
                    {{ major.name }}
                </li>
            </ul>
        </div>
        <div class="md:w-3/4 pr-4 pl-4">
            <h4>Subscribe to a Course</h4>
            <ul class="flex flex-col pl-0 mb-0 border rounded border-gray-300">
                <li
                    class="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
                    :class="{ active: index == currentCourseIndex }"
                    v-for="(course, index) in courses"
                    :key="index"
                    @click="setActiveCourse(course, index)"
                >
                    {{ course.course_code +','+ course.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from 'vuex'
import StudentCourseRelationDataService from "@/services/StudentCourseRelationDataService";
import MajorDataService from "@/services/MajorDataService";
import CourseDataService from "@/services/CourseDataService";
import Major from "@/types/Major";
import Course from "@/types/Course";
import ResponseData from "@/types/ResponseData";


export default defineComponent({
    name: "SubscribeCourse",
    data() {
        return {
            majors: [] as Array<Major>,
            currentMajor: {} as Major,
            currentMajorIndex: -1,
            courses: [] as Array<Course>,
            currentCourse: {} as Course,
            currentCourseIndex: -1
        };
    },
    emits: ['doneUpdate'],
    computed: {
        currentUser() {
            const store=useStore();
            return store.state.auth.user;
        },
    },
    setup(props, context) {
        const store=useStore();
        return {
            getStore:function() {
                return store;
            }
        }
    },
    methods: {
        retrieveMajors() {
            MajorDataService.getAll().then((response: ResponseData) => {
                this.majors = response.data;
                console.log(response.data);
            }).catch((e: Error) => {
                console.log(e);
            });
        },
        retrieveCourses() {
            CourseDataService.findByMajor(this.currentMajor.major_id).then((response: ResponseData) => {
                this.courses = response.data;
                console.log(response.data);
            }).catch((e: Error) => {
                console.log(e);
            });
        },
        setActiveMajor(major: Major, index = -1) {
            this.currentMajor = major;
            this.currentMajorIndex = index;
            this.retrieveCourses();
        },
        setActiveCourse(course: Course, index = -1) {
            const store=this.getStore();
            const loggedUser= store.state.auth.user;
            StudentCourseRelationDataService.create({student_id: loggedUser.student_id, course_id:course.course_id}).then((response: ResponseData) => {
                this.$emit('doneUpdate');
            }).catch((e: Error) => {
                console.log(e);
            });
            // this.currentMajor = major;
            // this.currentMajorIndex = index;
            // this.retrieveCourses();
        }
    },
    components: {
    },
    mounted() {
        this.retrieveMajors();
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