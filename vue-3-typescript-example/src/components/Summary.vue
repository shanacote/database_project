<template>
    <button class="flex items-center px-3 py-2 border rounded bg-blue-400 text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <!-- <font-awesome-icon :icon="['fas', 'book']" /> -->
        <span>Subscribe to Course</span>
    </button>
    <StudentCourseTable />
    <button class="flex items-center px-3 py-2 border rounded bg-blue-400 text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <!-- <font-awesome-icon :icon="['fas', 'hockey-puck']" /> -->
        <span>Subscribe to Sport</span>
    </button>
    <StudentSportTable />
    <button class="flex items-center px-3 py-2 border rounded bg-blue-400 text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <!-- <font-awesome-icon :icon="['fas', 'balance-scale']" /> -->
        <span>Subscribe to Club</span>
    </button>
    <StudentClubTable />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SportTable from "./SportTable.vue";
import ClubTable from "./ClubTable.vue";
import StudentCourseTable from "./StudentCourseTable.vue";
import StudentSportTable from "./StudentSportTable.vue";
import StudentClubTable from "./StudentClubTable.vue";


interface Table {
    key: string;
    name: string;
    route: string;
    type:any;
}
export default defineComponent({
    name: "Admin",
    data() {
        return {
            tables: [
                {key:'club',name:'Club',type:ClubTable},
                {key:'sport',name:'Sport',type:SportTable}
            ] as Table[],
            currentTable: {} as Table,
            currentIndex: -1,
            title: "",
        };
    },
    methods: {
        setActiveTable(table: Table, index = -1) {
            this.currentTable = table;
            this.currentIndex = index;
        }
    },
    components: {
        StudentCourseTable,
        StudentSportTable,
        StudentClubTable
    }
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>