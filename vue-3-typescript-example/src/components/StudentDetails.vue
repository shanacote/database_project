<template>
    <!-- <teleport to="#modals">
        <div v-if="showModal" class="modal"> -->
            <div v-if="currentSport.sport_id" class="edit-form">
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
                <div class="mb-4">
                    <label for="major_id">Major ID</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="major_id"
                    v-model="currentStudent.major_id"
                    />
                </div>
                <!-- <div class="mb-4">
                    <label for="season">Season</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="season"
                    v-model="currentSport.season"
                    />
                </div> -->

                </form>


                <!-- <button class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-red-600 text-white hover:bg-red-700 mr-2" @click="deleteStudent">
                Delete
                </button> -->

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
import { defineComponent } from "vue";
import StudentDataService from "@/services/StudentDataService";
import Student from "@/types/Student";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: "student",
    props: {
        currentStudentId: String,
    },
    data() {
        return {
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

        // deleteStudent() {
        //     StudentDataService.delete(this.currentStudent.student_id)
        //         .then((response: ResponseData) => {
        //             console.log(response.data);
        //             this.$router.push({ name: "students" });
        //         })
        //         .catch((e: Error) => {
        //             console.log(e);
        //         });
        // },
    },
    mounted() {
        this.message = "";
        this.getStudent(this.$route.params.id||this.$props.currentStudentId);
    },
    dismount() {
        this.showModal=false;
    }
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