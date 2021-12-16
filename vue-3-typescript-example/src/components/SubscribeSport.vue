<template>
    <div class=" flex flex-wrap ">
        <div class="md:w-2/4 pr-4 pl-4">
            <h4>Subscribe to a Sport</h4>
            <ul class="flex flex-col pl-0 mb-0 border rounded border-gray-300">
                <li
                    class="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
                    :class="{ active: index == currentSportIndex }"
                    v-for="(sport, index) in sports"
                    :key="index"
                    @click="setActiveSport(sport, index)"
                >
                    {{ sport.gender+','+sport.sport+','+sport.season }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from 'vuex'
import StudentSportRelationDataService from "@/services/StudentSportRelationDataService";
import SportDataService from "@/services/SportDataService";
import Sport from "@/types/Sport";
import ResponseData from "@/types/ResponseData";


export default defineComponent({
    name: "SubscribeSport",
    data() {
        return {
            sports: [] as Array<Sport>,
            currentSport: {} as Sport,
            currentSportIndex: -1,
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
        retrieveSports() {
            SportDataService.getAll().then((response: ResponseData) => {
                this.sports = response.data;
                console.log(response.data);
            }).catch((e: Error) => {
                console.log(e);
            });
        },

        setActiveSport(sport: Sport, index = -1) {
            this.currentSport = sport;
            this.currentSportIndex = index;
            const store=this.getStore();
            const loggedUser= store.state.auth.user;
            StudentSportRelationDataService.create({student_id: loggedUser.student_id, sport_id:sport.sport_id}).then((response: ResponseData) => {
                this.$emit('doneUpdate');
            }).catch((e: Error) => {
                console.log(e);
            });

        }
    },
    components: {
    },
    mounted() {
        this.retrieveSports();
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