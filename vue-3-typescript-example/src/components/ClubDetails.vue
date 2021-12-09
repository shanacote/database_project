<template>
    <!-- <teleport to="#modals">
        <div v-if="showModal" class="modal"> -->
            <div v-if="currentClub.club_id" class="edit-form">
                <h4>Club</h4>
                <form>
                <div class="mb-4">
                    <label for="club_id">Club_id</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="club_id"
                    v-model="currentClud.gender"
                    />
                </div>
                <div class="mb-4">
                    <label for="name">Name</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="name"
                    v-model="currentClub.name"
                    />
                </div>
                <div class="mb-4">
                    <label for="type">Type</label>
                    <input
                    type="text"
                    class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                    id="type"
                    v-model="currentClub.type"
                    />
                </div>

                </form>


                <!-- <button class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-red-600 text-white hover:bg-red-700 mr-2" @click="deleteClub">
                Delete
                </button> -->

                <button type="submit" class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500 text-white hover:green-600" @click="updateClub">
                Save
                </button>
                <p>{{ message }}</p>
            </div>

            <div v-else>
                <br />
                <p>Please click on a Club...</p>
            </div>
        <!-- </div>
    </teleport> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClubDataService from "@/services/ClubDataService";
import Club from "@/types/Club";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
    name: "club",
    props: {
        currentClubId: String,
    },
    data() {
        return {
            currentClub: {} as Club,
            showModal: true,
            message: "",
        };
    },
    emits: ['doneUpdate'],
    methods: {
        getClub(id: any) {
            ClubDataService.get(id)
                .then((response: ResponseData) => {
                    this.currentClub = response.data;
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.error(e);
                });
        },


        updateClub() {
            ClubDataService.update(this.currentClub.club_id, this.currentClub)
            .then((response: ResponseData) => {
                console.log(response.data);
                this.message = "The club was updated successfully!";
                this.$emit('doneUpdate');
            })
            .catch((e: Error) => {
                console.error(e);
                this.$emit('doneUpdate');
            });
        },

        // deleteClub() {
        //     ClubDataService.delete(this.currentClub.club_id)
        //         .then((response: ResponseData) => {
        //             console.log(response.data);
        //             this.$router.push({ name: "clubs" });
        //         })
        //         .catch((e: Error) => {
        //             console.log(e);
        //         });
        // },
    },
    mounted() {
        this.message = "";
        this.getClub(this.$route.params.id||this.$props.currentClubId);
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