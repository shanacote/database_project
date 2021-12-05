<template>
    <!-- <teleport to="#modals">
        <div v-if="showModal" class="modal"> -->
            <div v-if="currentSport.sport_id" class="edit-form">
                <h4>Sport</h4>
                <form>
                <div class="mb-4">
                    <label for="gender">Gender</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="gender"
                    v-model="currentSport.gender"
                    />
                </div>
                <div class="mb-4">
                    <label for="sport">Sport</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="sport"
                    v-model="currentSport.sport"
                    />
                </div>
                <div class="mb-4">
                    <label for="season">Season</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="season"
                    v-model="currentSport.season"
                    />
                </div>

                </form>


                <!-- <button class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-red-600 text-white hover:bg-red-700 mr-2" @click="deleteSport">
                Delete
                </button> -->

                <button type="submit" class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500 text-white hover:green-600" @click="updateSport">
                Save
                </button>
                <p>{{ message }}</p>
            </div>

            <div v-else>
                <br />
                <p>Please click on a Sport...</p>
            </div>
        <!-- </div>
    </teleport> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SportDataService from "@/services/SportDataService";
import Sport from "@/types/Sport";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: "sport",
    props: {
        currentSportId: String,
    },
    data() {
        return {
            currentSport: {} as Sport,
            showModal: true,
            message: "",
        };
    },
    emits: ['doneUpdate'],
    methods: {
        getSport(id: any) {
            SportDataService.get(id)
                .then((response: ResponseData) => {
                    this.currentSport = response.data;
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.error(e);
                });
        },


        updateSport() {
            SportDataService.update(this.currentSport.sport_id, this.currentSport)
            .then((response: ResponseData) => {
                console.log(response.data);
                this.message = "The sport was updated successfully!";
                this.$emit('doneUpdate');
            })
            .catch((e: Error) => {
                console.error(e);
                this.$emit('doneUpdate');
            });
        },

        // deleteSport() {
        //     SportDataService.delete(this.currentSport.sport_id)
        //         .then((response: ResponseData) => {
        //             console.log(response.data);
        //             this.$router.push({ name: "sports" });
        //         })
        //         .catch((e: Error) => {
        //             console.log(e);
        //         });
        // },
    },
    mounted() {
        this.message = "";
        this.getSport(this.$route.params.id||this.$props.currentSportId);
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