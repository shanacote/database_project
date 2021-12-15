<template>
    <table-lite
        :is-slot-mode="true"
        :title= "'Your Sports'"
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
                <button type="button" @click="deleteClicked(data.value.sport_id)" data-id="{{data.value[col.field]}}" ><font-awesome-icon :icon="['fas', 'trash-alt']" /></button>
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
import StudentSportRelationDataService from "@/services/StudentSportRelationDataService";
import SportDataService from "@/services/SportDataService";
import Sport from "@/types/Sport";
import StudentSportRelation from "@/types/StudentSportRelation";
import ResponseData from "@/types/ResponseData";

const table = reactive({
    isLoading: true,
    columns: [
        {
            label: "Gender",
            field: "gender",
            width: "10%",
            sortable: true,
        },
        {
            label: "Sport",
            field: "sport",
            width: "25%",
            sortable: false,
        },
        {
            label: "Season",
            field: "season",
            width: "10%",
            sortable: true,
        },
        {
            label: "",
            field: "quick",
            width: "5%",
        }
    ],
    rows: [] as Array<StudentSportExpanded>,
    sports: [] as Array<Sport>,
    showEditModal: false,
    currentStudentId: -1,
    totalRecordCount: 0,
    sortable: {
        order: "student_id",
        sort: "asc",
    }
});

interface StudentSportExpanded {
    student_id: number;
    sport_id: number;
    gender: string;
    sport: string;
    season: string;
}

export default defineComponent({
    name: "StudentSportTable",
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
        // Initial load
        this.doSearch('student_id', 'asc');
    },
    methods: {
        deleteClicked: function(sport_id:number) {
            console.log(`delete clicked for student:${this.currentUser()}, sport:${sport_id}`);
            StudentSportRelationDataService.delete(this.currentUser(), sport_id)
                .then((response: ResponseData) => {
                    console.log(response.data);
                    const idx=table.rows.findIndex((e:StudentSportExpanded)=>e.sport_id===sport_id);
                    table.rows.splice(idx,1);
                    table.totalRecordCount--;
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        doSearch: (order: string, sort: string) => {
            const store=useStore();
            const loggedUser= store.state.auth.user;
            table.isLoading = true;
            SportDataService.getAll().then((response: ResponseData) => {
                table.sports=response.data;
                StudentSportRelationDataService.getAll().then((response: ResponseData) => {
                    // this.students = response.data;
                    console.log(response.data);
                    table.rows = [];
                    // refresh table rows
                    for(let i=0; i<response.data.length; i++) {
                        const scr:StudentSportRelation = response.data[i];
                        if(scr.student_id===loggedUser) {
                            const c:Sport=table.sports.find(e=>e.sport_id===scr.sport_id)!;
                            table.rows.push({
                                student_id:scr.student_id,
                                sport_id: scr.sport_id,
                                gender: c.gender,
                                sport: c.sport,
                                season: c.season
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
