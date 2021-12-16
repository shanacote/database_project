<template>
    <div class=" flex flex-wrap ">
        <div class="md:w-1/4 pr-4 pl-4">
            <!-- <h4>List</h4> -->
            <ul class="flex flex-col pl-0 mb-0 border rounded border-gray-300">
                <li
                    class="relative block py-3 px-6 -mb-px border border-r-0 border-l-0 border-gray-300 no-underline"
                    :class="{ active: index == currentIndex }"
                    v-for="(table, index) in tables"
                    :key="index"
                    @click="setActiveTable(table, index)"
                >
                    {{ table.name }}
                </li>
            </ul>

        </div>
        <div class="md:w-3/4 pr-4 pl-4">
            <button v-if="currentTable.key" @click="handleAddClick(currentTable)" class="flex items-center px-3 py-2 border rounded bg-blue-400 text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <span>Add</span>
            </button>

            <div v-if="currentTable.name">
                    <!-- https://medium.com/geekculture/dynamic-components-in-vue-3-7504d5ffcb6c -->
                    <component
                        ref="tableComp"
                        :key="currentTable.key"
                        :is="currentTable.tableComponent">
                    </component>

            </div>
            <div v-else>
                <br />
                <p>Please click on an item to administer...</p>
            </div>
        </div>
    </div>
    <teleport to="#modals">
        <div v-if="showAddModal" class="modal">
            <!-- https://stackoverflow.com/questions/64820762/vue-define-event-handlers-in-array-of-dynamic-components -->
            <component
                :key="currentTable.key"
                :is="currentTable.addComponent"
                v-on:done-update="addModalDone">
            </component>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SportTable from "./SportTable.vue";
import ClubTable from "./ClubTable.vue";
import MajorTable from "./MajorTable.vue";
import StudentTable from "./StudentTable.vue";
import CourseTable from "./CourseTable.vue";
import AddSport from "./AddSport.vue";
import AddClub from "./AddClub.vue";
import AddMajor from "./AddMajor.vue";
import AddStudent from "./AddStudent.vue";
import AddCourse from "./AddCourse.vue";

interface Table {
    key: string;
    keyField:string;
    name: string;
    route: string;
    tableComponent:any;
    addComponent:any;
}
export default defineComponent({
    name: "Admin",
    data() {
        return {
            tables: [
                {key:'club',keyField:'club_id',name:'Club',tableComponent:ClubTable,addComponent:AddClub},
                {key:'sport',keyField:'sport_id',name:'Sport',tableComponent:SportTable,addComponent:AddSport},
                {key:'major',keyField:'major_id',name:'Major',tableComponent:MajorTable,addComponent:AddMajor},
                {key:'student',keyField:'student_id',name:'Student',tableComponent:StudentTable,addComponent:AddStudent},
                {key:'course',keyField:'course_id',name:'Course',tableComponent:CourseTable,addComponent:AddCourse},
            ] as Table[],
            currentTable: {} as Table,
            currentIndex: -1,
            showAddModal: false,
            title: "",
        };
    },
    methods: {
        setActiveTable(table: Table, index = -1) {
            this.currentTable = table;
            this.currentIndex = index;
        },
        addModalDone: function() {
            this.showAddModal=false;
            const tableComp:any=this.$refs.tableComp;
            tableComp.doSearch(this.currentTable.keyField, 'asc');
        },
        handleAddClick(table: Table) {
            this.showAddModal=true;
            console.log(table);
            // if(table) {

            // }
        }
    }
});
</script>

<style>

</style>