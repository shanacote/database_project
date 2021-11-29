<template>
    <table-lite
        :is-slot-mode="false"
        :title= "'test'"
        :has-checkbox="true"
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
        <!-- <template v-slot:name="data">
            <button type="button" data-id="{{data.value.name}}" ><font-awesome-icon :icon="['fas', 'pencil-alt']" />Button</button>
        </template> -->
    </table-lite>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import TableLite from "./Table.vue";
import SportDataService from "@/services/SportDataService";
import ResponseData from "@/types/ResponseData";

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
            // display: function (row: any) {
            //     return (
            //     '<a href="/sports/' + row.sport_id + '" class="name-btn">' + row.title + "</button>"
            //     );
            // }
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
            display: function (row: any) {
                return (
                    // '<button type="button" data-id="' + row.sport_id + '" ><font-awesome-icon :icon="[\'fas\', \'pencil-alt\']" />Button</button>'
                   '<button type="button" data-id="' + row.sport_id + '" class="is-rows-el quick-btn-edit  p-1  font-semibold text-sm   rounded bg-blue-500 text-white hover:bg-blue-600">Edit</button>&nbsp;'+
                   '<button type="button" data-id="' + row.sport_id + '" class="is-rows-el quick-btn-delete  p-1  font-semibold text-sm   rounded bg-blue-500 text-white hover:bg-blue-600">Delete</button>'
                    // '<button type="button" data-id="' + row.user_id + '" class="quick-btn">Button</button>'
                );
            }
        }
    ],
    rows: [
        // {id:'1',name:'test',email:'jc'}
    ],
    totalRecordCount: 0,
    sortable: {
        order: "sport_id",
        sort: "asc",
    }
});

SportDataService.getAll()
    .then((response: ResponseData) => {
        // this.sports = response.data;
        console.log(response.data);

        // refresh table rows
        table.rows = response.data;
        table.totalRecordCount = response.data.length;
        table.isLoading = false;
    })
    .catch((e: Error) => {
        console.log(e);
        table.isLoading = false;
    });

export default defineComponent({
    name: "SportTable",
    components: { TableLite },
    data() { return {table, doSearch, updateCheckedRows, tableLoadingFinish} },
    props: {
        msg: String,
    },
});


const doSearch = (order: string, sort: string) => {
    table.isLoading = true;

    SportDataService.getAll()
        .then((response: ResponseData) => {
            // this.sports = response.data;
            console.log(response.data);
            // Point: your response is like it on this example.
            //   {
            //   rows: [{
            //     id: 1,
            //     name: 'jack',
            //     email: 'example@example.com'
            //   },{
            //     id: 2,
            //     name: 'rose',
            //     email: 'example@example.com'
            //   }],
            //   count: 2,
            //   ...something
            // }

            // refresh table rows
            table.rows = response.data.rows;
            table.totalRecordCount = response.data.count;
            table.sortable.order = order;
            table.sortable.sort = sort;
            // table.isLoading = false;
        })
        .catch((e: Error) => {
            console.log(e);
            // table.isLoading = false;
        });
    // // Start use axios to get data from Server
    // let url = 'https://www.example.com/api/some_endpoint?offset=' + offset + '&limit=' + limit + '&order=' + order + '&sort=' + sort;
    // axios.get(url)
    // .then((response) => {
    // });
  // End use axios to get data from Server
};

const tableLoadingFinish = (elements: any) => {
    const self:any=this as any;
    const self2=ref(null);
    table.isLoading = false;
    Array.prototype.forEach.call(elements, function (element) {
        if (element.classList.contains("name-btn")) {
            element.addEventListener("click",  () => {
                // do your click event
                console.log(self.dataset.sport_id + " name-btn click!!");
            });
        }
        if (element.classList.contains("quick-btn-edit")) {
            // do your click event
            element.addEventListener("click",  function(this:any) {
                console.log(this.dataset.sport_id + " quick-btn-edit click!!");
            });
        }
        if (element.classList.contains("quick-btn-delete")) {
            // do your click event
            element.addEventListener("click",  function(this:any) {
                console.log(this.dataset.sport_id + " quick-btn-delete click!!");
            });
        }
    });
};

const updateCheckedRows = (rowsKey: string) => {
    // do your checkbox click event
    console.log(`Selected: ${rowsKey}`);
};
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
