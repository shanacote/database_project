<template>
    <table-lite
        :is-slot-mode="true"
        :title= "'Sports'"
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
                <button type="button" @click="editClicked(data.value.sport_id)" data-id="{{data.value[col.field]}}" ><font-awesome-icon :icon="['fas', 'pencil-alt']" /></button>&nbsp;
                <button type="button" @click="deleteClicked(data.value.sport_id)" data-id="{{data.value[col.field]}}" ><font-awesome-icon :icon="['fas', 'trash-alt']" /></button>
            </div>
            <div v-else>
                <!-- Show normal cell value -->
                {{data.value[col.field]}}
            </div>
        </template>
    </table-lite>

    <teleport to="#modals">
        <div v-if="table.showEditModal" class="modal">
            <SportDetails :current-sport-id="table.currentSportId" @doneUpdate="editModalDone"></SportDetails>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import TableLite from "./Table.vue";
import SportDataService from "@/services/SportDataService";
import Sport from "@/types/Sport";
import ResponseData from "@/types/ResponseData";
import SportDetails from "./SportDetails.vue";

const table = reactive({
    isLoading: true,
    columns: [
        {
            label: "Sport Id",
            field: "sport_id",
            width: "3%",
            sortable: true,
            isKey: true,
        },
        {
            label: "Gender",
            field: "gender",
            width: "10%",
            sortable: true,
            display: function (row: any) {
                return (
                '<a href="/sports/' + row.sport_id + '" class="name-btn">' + row.gender + "</button>"
                );
            }
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
            width: "10%",
            // display: function (row: any) {
            //     return (
            //         // '<button type="button" data-id="' + row.sport_id + '" ><font-awesome-icon :icon="[\'fas\', \'pencil-alt\']" />Button</button>'
            //        '<button type="button" data-id="' + row.sport_id + '" class="is-rows-el quick-btn-edit  p-1  font-semibold text-sm   rounded bg-blue-500 text-white hover:bg-blue-600">Edit</button>&nbsp;'+
            //        '<button type="button" data-id="' + row.sport_id + '" class="is-rows-el quick-btn-delete  p-1  font-semibold text-sm   rounded bg-blue-500 text-white hover:bg-blue-600">Delete</button>'
            //         // '<button type="button" data-id="' + row.user_id + '" class="quick-btn">Button</button>'
            //     );
            // }
        }
    ],
    rows: [] as Array<Sport>,
    showEditModal: false,
    currentSportId: -1,
    totalRecordCount: 0,
    sortable: {
        order: "sport_id",
        sort: "asc",
    }
});


export default defineComponent({
    name: "SportTable",
    components: { TableLite, SportDetails },
    data() { return {table, doSearch, updateCheckedRows, tableLoadingFinish, editClicked, deleteClicked, editModalDone} },
    props: {
        msg: String,
    },
});
const editModalDone=function() {
    table.showEditModal=false;
    doSearch('sport_id', 'asc');
}
const editClicked=function(sportId:number) {
    console.log('edit clicked for:'+sportId);
    table.currentSportId=sportId;
    table.showEditModal=true;
}
const deleteClicked=function(sportId:number) {
    console.log('delete clicked for:'+sportId);
    SportDataService.delete(sportId)
        .then((response: ResponseData) => {
            console.log(response.data);
            const idx=table.rows.findIndex(e=>e.sport_id===sportId);
            table.rows.splice(idx,1);
            table.totalRecordCount--;
        })
        .catch((e: Error) => {
          console.log(e);
        });
}
const doSearch = (order: string, sort: string) => {
    table.isLoading = true;

    SportDataService.getAll()
        .then((response: ResponseData) => {
            // this.sports = response.data;
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
doSearch('sport_id', 'asc');

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
