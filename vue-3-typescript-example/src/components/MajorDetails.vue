<template>
    <!-- <teleport to="#modals">
        <div v-if="showModal" class="modal"> -->
            <div v-if="currentMajor.major_id" class="edit-form">
                <h4>Major</h4>
                <form>
                <div class="mb-4">
                    <label for="name">Name</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="name"
                    v-model="currentMajor.name"
                    />
                </div>

                </form>


                <!-- <button class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-red-600 text-white hover:bg-red-700 mr-2" @click="deleteMajor">
                Delete
                </button> -->

                <button type="submit" class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500 text-white hover:green-600" @click="updateMajor">
                Save
                </button>
                <p>{{ message }}</p>
            </div>

            <div v-else>
                <br />
                <p>Please click on a Major...</p>
            </div>
        <!-- </div>
    </teleport> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MajorDataService from "@/services/MajorDataService";
import Major from "@/types/Major";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: "major",
    props: {
        currentMajorId: String,
    },
    data() {
        return {
            currentMajor: {} as Major,
            showModal: true,
            message: "",
        };
    },
    emits: ['doneUpdate'],
    methods: {
        getMajor(id: any) {
            MajorDataService.get(id)
                .then((response: ResponseData) => {
                    this.currentMajor = response.data;
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.error(e);
                });
        },


        updateMajor() {
            MajorDataService.update(this.currentMajor.major_id, this.currentMajor)
            .then((response: ResponseData) => {
                console.log(response.data);
                this.message = "The major was updated successfully!";
                this.$emit('doneUpdate');
            })
            .catch((e: Error) => {
                console.error(e);
                this.$emit('doneUpdate');
            });
        },

        // deleteMajor() {
        //     MajorDataService.delete(this.currentMajor.major_id)
        //         .then((response: ResponseData) => {
        //             console.log(response.data);
        //             this.$router.push({ name: "majors" });
        //         })
        //         .catch((e: Error) => {
        //             console.log(e);
        //         });
        // },
    },
    mounted() {
        this.message = "";
        this.getMajor(this.$route.params.id||this.$props.currentMajorId);
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