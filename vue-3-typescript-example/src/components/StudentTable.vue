<template>
    <table-lite
        :is-slot-mode="true"
        :title= "'test'"
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
                <button type="button" @click="editClicked(data.value.student_id)" data-id="{{data.value[col.field]}}" ><font-awesome-icon :icon="['fas', 'pencil-alt']" /></button>&nbsp;
                <button type="button" @click="deleteClicked(data.value.student_id)" data-id="{{data.value[col.field]}}" ><font-awesome-icon :icon="['fas', 'trash-alt']" /></button>
            </div>
            <div v-else>
                <!-- Show normal cell value -->
                {{data.value[col.field]}}
            </div>
        </template>
    </table-lite>

    <teleport to="#modals">
        <div v-if="table.showEditModal" class="modal">
            <StudentDetails :current-student-id="table.currentStudentId" @doneUpdate="editModalDone"></StudentDetails>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import TableLite from "./Table.vue";
import StudentDataService from "@/services/StudentDataService";
import Student from "@/types/Student";
import ResponseData from "@/types/ResponseData";
import StudentDetails from "./StudentDetails.vue";

const table = reactive({
    isLoading: true,
    columns: [
        {
            label: "Student Id",
            field: "student_id",
            width: "3%",
            sortable: true,
            isKey: true,
        },
        {
            label: "Name",
            field: "name",
            width: "10%",
            sortable: true,
            display: function (row: any) {
                return (
                '<a href="/students/' + row.student_id + '" class="name-btn">' + row.name + "</button>"
                );
            }
        },
        // {
        //     label: "Sport",
        //     field: "sport",
        //     width: "25%",
        //     sortable: false,
        // },
        // {
        //     label: "Season",
        //     field: "season",
        //     width: "10%",
        //     sortable: true,
        // },
        {
            label: "",
            field: "quick",
            width: "10%",
            // display: function (row: any) {
            //     return (
            //         // '<button type="button" data-id="' + row.student_id + '" ><font-awesome-icon :icon="[\'fas\', \'pencil-alt\']" />Button</button>'
            //        '<button type="button" data-id="' + row.student_id + '" class="is-rows-el quick-btn-edit  p-1  font-semibold text-sm   rounded bg-blue-500 text-white hover:bg-blue-600">Edit</button>&nbsp;'+
            //        '<button type="button" data-id="' + row.student_id + '" class="is-rows-el quick-btn-delete  p-1  font-semibold text-sm   rounded bg-blue-500 text-white hover:bg-blue-600">Delete</button>'
            //         // '<button type="button" data-id="' + row.user_id + '" class="quick-btn">Button</button>'
            //     );
            // }
        }
    ],
    rows: [] as Array<Student>,
    showEditModal: false,
    currentStudentId: -1,
    totalRecordCount: 0,
    sortable: {
        order: "student_id",
        sort: "asc",
    }
});


export default defineComponent({
    name: "StudentTable",
    components: { TableLite, StudentDetails },
    data() { return {table, doSearch, updateCheckedRows, tableLoadingFinish, editClicked, deleteClicked, editModalDone} },
    props: {
        msg: String,
    },
});
const editModalDone=function() {
    table.showEditModal=false;
    doSearch('student_id', 'asc');
}
const editClicked=function(studentId:number) {
    console.log('edit clicked for:'+studentId);
    table.currentStudentId=studentId;
    table.showEditModal=true;
}
const deleteClicked=function(studentId:number) {
    console.log('delete clicked for:'+studentId);
    StudentDataService.delete(studentId)
        .then((response: ResponseData) => {
            console.log(response.data);
            const idx=table.rows.findIndex(e=>e.student_id===studentId);
            table.rows.splice(idx,1);
            table.totalRecordCount--;
        })
        .catch((e: Error) => {
          console.log(e);
        });
}
const doSearch = (order: string, sort: string) => {
    table.isLoading = true;

    StudentDataService.getAll()
        .then((response: ResponseData) => {
            // this.students = response.data;
            console.log(response.data);
            // refresh table rows
            table.rows = response.data;
            table.totalRecordCount = response.data.length;
            table.sortable.order = order;
            table.sortable.sort = sort;
            table.isLoading = false;
        })
        .catch((e: Error) => {
            console.log(e);
            table.isLoading = false;
        });
};

const tableLoadingFinish = (elements: any) => {
    const self:any=this as any;
    const self2=ref(null);
    table.isLoading = false;
    Array.prototype.forEach.call(elements, function (element) {
        if (element.classList.contains("name-btn")) {
            element.addEventListener("click",  () => {
                // do your click event
                console.log(self.dataset.id + " name-btn click!!");
            });
        }
        if (element.classList.contains("quick-btn-edit")) {
            // do your click event
            element.addEventListener("click",  function(this:any) {
                console.log(this.dataset.id + " quick-btn-edit click!!");
            });
        }
        if (element.classList.contains("quick-btn-delete")) {
            // do your click event
            element.addEventListener("click",  function(this:any) {
                console.log(this.dataset.id + " quick-btn-delete click!!");
            });
        }
    });
};

const updateCheckedRows = (rowsKey: string) => {
    // do your checkbox click event
    console.log(`Selected: ${rowsKey}`);
};
// Initial load
doSearch('student_id', 'asc');

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
