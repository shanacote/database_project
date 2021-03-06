<template>
    <table-lite
        :is-slot-mode="true"
        :title= "'Your Clubs'"
        :has-checkbox="false"
        :is-loading="table.isLoading"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        :messages="table.messages"
        @do-search="doSearch"
        @is-finished-old="table.isLoading = false"
        @is-finished="tableLoadingFinish"
        @return-checked-rows="updateCheckedRows">
        <template v-for="(col, i) of table.columns" v-slot:[col.field]="data" :key="i">
            <div v-if="!data.value[col.field]">
                <button type="button" @click="deleteClicked(data.value.club_id)" data-id="{{data.value[col.field]}}" ><font-awesome-icon :icon="['fas', 'trash-alt']" /></button>
            </div>
            <div v-else>
                <!-- Show normal cell value -->
                {{data.value[col.field]}}
            </div>
        </template>
    </table-lite>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from 'vuex'
import TableLite from "./Table.vue";
import StudentClubRelationDataService from "@/services/StudentClubRelationDataService";
import ClubDataService from "@/services/ClubDataService";
import Club from "@/types/Club";
import StudentClubRelation from "@/types/StudentClubRelation";
import ResponseData from "@/types/ResponseData";

const table = reactive({
    isLoading: true,
    columns: [
        {
            label: "Name",
            field: "name",
            width: "10%",
            sortable: true,
        },
        {
            label: "Type",
            field: "type",
            width: "25%",
            sortable: false,
        },
        {
            label: "",
            field: "quick",
            width: "5%",
        }
    ],
    rows: [] as Array<StudentClubExpanded>,
    sports: [] as Array<Club>,
    showEditModal: false,
    currentStudentId: -1,
    totalRecordCount: 0,
    sortable: {
        order: "student_id",
        sort: "asc",
    }
});

interface StudentClubExpanded {
    student_id: number;
    club_id: number;
    name: string;
    type: string;
}

export default defineComponent({
    name: "StudentClubTable",
    components: { TableLite },
    data() { return {table} },
    props: {
        msg: String,
    },
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
    mounted() {
        const store=useStore();
        table.currentStudentId= store.state.auth.user.student_id;
        // Initial load
        this.doSearch('student_id', 'asc');
    },
    methods: {
        deleteClicked: function(club_id:number) {
            console.log(`delete clicked for student:${table.currentStudentId}, sport:${club_id}`);
            StudentClubRelationDataService.delete(table.currentStudentId, club_id)
                .then((response: ResponseData) => {
                    console.log(response.data);
                    const idx=table.rows.findIndex((e:StudentClubExpanded)=>e.club_id===club_id);
                    table.rows.splice(idx,1);
                    table.totalRecordCount--;
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        doSearch: (order: string, sort: string) => {
            table.isLoading = true;
            // const store=useStore();
            // const loggedUser= store.state.auth.user;
            ClubDataService.getAll().then((response: ResponseData) => {
                table.sports=response.data;
                StudentClubRelationDataService.getAll().then((response: ResponseData) => {
                    // this.students = response.data;
                    console.log(response.data);
                    table.rows = [];
                    // refresh table rows
                    for(let i=0; i<response.data.length; i++) {
                        const scr:StudentClubRelation = response.data[i];
                        if(scr.student_id===table.currentStudentId) {
                            const c:Club=table.sports.find(e=>e.club_id===scr.club_id)!;
                            table.rows.push({
                                student_id:scr.student_id,
                                club_id: scr.club_id,
                                name: c.name,
                                type: c.type
                            })
                        }
                    }
                    // table.rows = response.data;
                    table.totalRecordCount = table.rows.length;
                    table.sortable.order = order;
                    table.sortable.sort = sort;
                    table.isLoading = false;
                }).catch((e: Error) => {
                    console.log(e);
                    table.isLoading = false;
                });
            });
        },

        tableLoadingFinish: (elements: any) => {
            const self:any=this as any;
            table.isLoading = false;
            Array.prototype.forEach.call(elements, function (element) {
                if (element.classList.contains("name-btn")) {
                    element.addEventListener("click",  () => {
                        // do your click event
                        console.log(self.dataset.id + " name-btn click!!");
                    });
                }
                if (element.classList.contains("quick-btn-delete")) {
                    // do your click event
                    element.addEventListener("click",  function(this:any) {
                        console.log(this.dataset.id + " quick-btn-delete click!!");
                    });
                }
            });
        },

        updateCheckedRows: (rowsKey: string) => {
            // do your checkbox click event
            console.log(`Selected: ${rowsKey}`);
        }

    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
