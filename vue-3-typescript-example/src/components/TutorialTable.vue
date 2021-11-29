<template>
    <table-lite
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
    @return-checked-rows="updateCheckedRows"
    ></table-lite>
    <!-- <table-lite
        :has-checkbox="true"
        :is-loading="table.isLoading"
        :is-re-search="table.isReSearch"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
        :messages="table.messages"
        @do-search="doSearch"
        @is-finished="tableLoadingFinish"
        @return-checked-rows="updateCheckedRows"
    ></table-lite> -->
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import TableLite from "./Table.vue";
import TutorialDataService from "@/services/TutorialDataService";
import ResponseData from "@/types/ResponseData";

const table = reactive({
    isLoading: true,
    columns: [
        {
            label: "ID",
            field: "id",
            width: "3%",
            sortable: true,
            isKey: true,
        },
        {
            label: "Title",
            field: "title",
            width: "10%",
            sortable: true,
            display: function (row: any) {
                return (
                '<a href="/tutorials/' + row.id + '" class="name-btn">' + row.title + "</button>"
                );
            }
        },
        {
            label: "Description",
            field: "description",
            width: "25%",
            sortable: false,
        },
        {
            label: "Published",
            field: "published",
            width: "10%",
            sortable: true,
        },
        {
            label: "",
            field: "quick",
            width: "10%",
            display: function (row: any) {
                return (
                    '<button type="button" data-id="' + row.id + '" class="is-rows-el quick-btn  p-1  font-semibold text-sm   rounded bg-blue-500 text-white hover:bg-blue-600">Button</button>'
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
        order: "id",
        sort: "asc",
    }
});

TutorialDataService.getAll()
    .then((response: ResponseData) => {
        // this.tutorials = response.data;
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
    name: "TutorialTable",
    components: { TableLite },
    data() { return {table, doSearch, updateCheckedRows, tableLoadingFinish} },
    props: {
        msg: String,
    },
});
// const table = reactive({
//   isLoading: false,
//   isReSearch: false,
//   columns: [
//     {
//       label: "ID",
//       field: "id",
//       width: "3%",
//       sortable: true,
//       isKey: true,
//     },
//     {
//       label: "Name",
//       field: "name",
//       width: "10%",
//       sortable: true,
//       display: function (row: any) {
//         return (
//           '<a href="#" data-id="' + row.user_id + '" class="name-btn">' + row.name + "</button>"
//         );
//       },
//     },
//     {
//       label: "Email",
//       field: "email",
//       width: "15%",
//       sortable: true,
//     },
//     {
//       label: "",
//       field: "quick",
//       width: "10%",
//       display: function (row: any) {
//         return (
//           '<button type="button" data-id="' + row.user_id + '" class="quick-btn">Button</button>'
//         );
//       },
//     },
//   ],
//   rows: [
//       {
//         id: 1,
//         name: "TEST1"
//       },
//       {
//         id: 2,
//         name: "TEST2"
//       }
//   ],
//   totalRecordCount: 2,
//   sortable: {
//     order: "id",
//     sort: "asc",
//   },
//   messages: {
//     pagingInfo: "Showing {0}-{1} of {2}",
//     pageSizeChangeLabel: "Row count:",
//     gotoPageLabel: "Go to page:",
//     noDataAvailable: "No data",
//   },
// });

// const doSearch = (offset: number, limit: number, order: string, sort: string) => {
//   table.isLoading = true;
//   table.isReSearch = offset == undefined ? true : false;
//   // do your search event to get newRows and new Total
//   table.rows = newRows;
//   table.totalRecordCount = newTotal;
//   table.sortable.order = order;
//   table.sortable.sort = sort;
// };

const doSearch = (order: string, sort: string) => {
    table.isLoading = true;

    TutorialDataService.getAll()
        .then((response: ResponseData) => {
            // this.tutorials = response.data;
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
                console.log(self.dataset.id + " name-btn click!!");
            });
        }
        if (element.classList.contains("quick-btn")) {
            // do your click event
            element.addEventListener("click",  function(this:any) {
                console.log(this.dataset.id + " quick-btn click!!");
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
