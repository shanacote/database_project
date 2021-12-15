<template>
    <!-- <teleport to="#modals">
        <div v-if="showModal" class="modal"> -->
            <div v-if="currentStudent.student_id" class="edit-form">
                <h4>Student</h4>
                <form>
                    <div class="mb-4">
                        <label for="name">Name</label>
                        <input
                        type="text"
                        class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                        id="name"
                        v-model="currentStudent.name"
                        />
                    </div>
                    <!-- https://medium.com/geekculture/dynamic-components-in-vue-3-7504d5ffcb6c -->
                    <div class="mb-4">
                        <label for="major_id">Major ID</label>
                        <select id="major_id" v-model="currentStudent.major_id" class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded">
                            <option v-for="option in majorOptions.options" :value="option.value" :key="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>
                </form>


                <button type="submit" class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500 text-white hover:green-600" @click="updateStudent">
                Save
                </button>
                <p>{{ message }}</p>
            </div>

            <div v-else>
                <br />
                <p>Please click on a Student...</p>
            </div>
        <!-- </div>
    </teleport> -->
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import StudentDataService from "@/services/StudentDataService";
import MajorDataService from "@/services/MajorDataService";
import Major from "@/types/Major";
import Student from "@/types/Student";
import ResponseData from "@/types/ResponseData";

const majorOptions = reactive({
    options:[] as Array<Major>
});

export default defineComponent({
    name: "student",
    props: {
        currentStudentId: String,
    },
    data() {
        return {
            majorOptions,
            currentStudent: {} as Student,
            showModal: true,
            message: "",
        };
    },
    emits: ['doneUpdate'],
    methods: {
        getStudent(id: any) {
            StudentDataService.get(id)
                .then((response: ResponseData) => {
                    this.currentStudent = response.data;
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.error(e);
                });
        },


        updateStudent() {
            StudentDataService.update(this.currentStudent.student_id, this.currentStudent)
            .then((response: ResponseData) => {
                console.log(response.data);
                this.message = "The student was updated successfully!";
                this.$emit('doneUpdate');
            })
            .catch((e: Error) => {
                console.error(e);
                this.$emit('doneUpdate');
            });
        },
    },
    mounted() {
        this.message = "";
        this.getStudent(this.$route.params.id||this.$props.currentStudentId);
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
    height: 300px;
    width: 400px;
    background: gray;
    text-align: center;
}
</style>