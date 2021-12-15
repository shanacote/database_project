<template>
    <div class="list flex flex-wrap ">
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
            <div v-if="currentTable.name">
                    <!-- https://medium.com/geekculture/dynamic-components-in-vue-3-7504d5ffcb6c -->
                    <component
                        :key="currentTable.key"
                        :is="currentTable.type">
                    </component>

            </div>
            <div v-else>
                <br />
                <p>Please click on an item to administer...</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SportTable from "./SportTable.vue";
import ClubTable from "./ClubTable.vue";
import MajorTable from "./MajorTable.vue";
import StudentTable from "./StudentTable.vue";

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
                {key:'sport',name:'Sport',type:SportTable},
                {key:'major',name:'Major',type:MajorTable},
                {key:'student',name:'Student',type:StudentTable},
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