<template>
    <div class=" flex flex-wrap ">
        <div class="md:w-2/4 pr-4 pl-4">
            <h4>Subscribe to a Club</h4>
            <ul class="flex flex-col pl-0 mb-0 border rounded border-gray-300">
                <li
                    class="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
                    :class="{ active: index == currentClubIndex }"
                    v-for="(club, index) in clubs"
                    :key="index"
                    @click="setActiveClub(club, index)"
                >
                    {{ club.name+','+club.type }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from 'vuex'
import StudentClubRelationDataService from "@/services/StudentClubRelationDataService";
import ClubDataService from "@/services/ClubDataService";
import Club from "@/types/Club";
import ResponseData from "@/types/ResponseData";


export default defineComponent({
    name: "SubscribeClub",
    data() {
        return {
            clubs: [] as Array<Club>,
            currentClub: {} as Club,
            currentClubIndex: -1,
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
        retrieveClubs() {
            ClubDataService.getAll().then((response: ResponseData) => {
                this.clubs = response.data;
                console.log(response.data);
            }).catch((e: Error) => {
                console.log(e);
            });
        },

        setActiveClub(club: Club, index = -1) {
            this.currentClub = club;
            this.currentClubIndex = index;
            const store=this.getStore();
            const loggedUser= store.state.auth.user;
            StudentClubRelationDataService.create({student_id: loggedUser.student_id, club_id:club.club_id}).then((response: ResponseData) => {
                this.$emit('doneUpdate');
            }).catch((e: Error) => {
                console.log(e);
            });

        }
    },
    components: {
    },
    mounted() {
        this.retrieveClubs();
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