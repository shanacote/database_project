<template>
    <button @click="toggleCourseSubscribe" class="flex items-center px-3 py-2 border rounded bg-blue-400 text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <!-- <font-awesome-icon :icon="['fas', 'book']" /> -->
        <span>Subscribe to Course</span>
    </button>
    <div v-if="showCourse" class="modal">
        <SubscribeCourse @doneUpdate="subscribeCourseDone"/>
    </div>
    <StudentCourseTable ref="studentCourseTable"/>
    <button @click="toggleSportSubscribe" class="flex items-center px-3 py-2 border rounded bg-blue-400 text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <!-- <font-awesome-icon :icon="['fas', 'hockey-puck']" /> -->
        <span>Subscribe to Sport</span>
    </button>
    <div v-if="showSport" class="modal">
        <SubscribeSport @doneUpdate="subscribeSportDone"/>
    </div>
    <StudentSportTable ref="studentSportTable"/>
    <button @click="toggleClubSubscribe" class="flex items-center px-3 py-2 border rounded bg-blue-400 text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <!-- <font-awesome-icon :icon="['fas', 'balance-scale']" /> -->
        <span>Subscribe to Club</span>
    </button>
    <div v-if="showClub" class="modal">
        <SubscribeClub @doneUpdate="subscribeClubDone"/>
    </div>
    <StudentClubTable ref="studentClubTable"/>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import StudentCourseTable from "./StudentCourseTable.vue";
import StudentSportTable from "./StudentSportTable.vue";
import StudentClubTable from "./StudentClubTable.vue";
import SubscribeCourse from "./SubscribeCourse.vue";
import SubscribeSport from "./SubscribeSport.vue";
import SubscribeClub from "./SubscribeClub.vue";


export default defineComponent({
    name: "Summary",
    data() {
        return {
            showCourse: false,
            showSport: false,
            showClub: false
        };
    },
    methods: {
        toggleCourseSubscribe: function() {
            this.showCourse=true;
        },
        toggleSportSubscribe: function() {
            this.showSport=true;
            console.log('test');
        },
        toggleClubSubscribe: function() {
            this.showClub=true;
            console.log('test');
        },
        subscribeCourseDone: function() {
            this.showCourse=false;
            const tableComp:any=this.$refs.studentCourseTable;
            tableComp.doSearch('', 'asc');
        },
        subscribeSportDone: function() {
            this.showSport=false;
            const tableComp:any=this.$refs.studentSportTable;
            tableComp.doSearch('', 'asc');
        },
        subscribeClubDone: function() {
            this.showClub=false;
            const tableComp:any=this.$refs.studentClubTable;
            tableComp.doSearch('', 'asc');
        }
    },
    components: {
        StudentCourseTable,
        StudentSportTable,
        StudentClubTable,
        SubscribeCourse,
        SubscribeSport,
        SubscribeClub
    }
});
</script>

<style>
</style>