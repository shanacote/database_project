<!-- Based on https://github.com/linmasahiro/vue3-table-lite -->
<template>
  <div class="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300">
    <div class="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900" v-if="title">{{ title }}</div>
    <div class="flex-auto p-6">
      <p class="mb-3"></p>
      <div id="dataTables-example_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
        <div class="flex flex-wrap "></div>
        <div class="flex flex-wrap ">
          <div class="sm:w-full pr-4 pl-4">
            <div class="flex flex-wrap "></div>
            <div v-if="isLoading" class="loading-mask">
              <div class="loading-content">
                <span style="color: white">Loading...</span>
              </div>
            </div>
            <table
              class="w-full max-w-full mb-4 bg-transparent table-hover table-bordered block w-full overflow-auto scrolling-touch"
              id="dataTables-example"
              ref="localTable"
            >
              <thead class="bg-gray-50">
                <tr>
                  <th v-if="hasCheckbox" class="checkbox-th">
                    <div>
                      <input type="checkbox" v-model="setting.isCheckAll" />
                    </div>
                  </th>
                  <th
                    v-for="(col, index) in columns"
                    :key="index"
                    :style="{ width: col.width ? col.width : 'auto' }"
                  >
                    <div
                      :class="{
                        sortable: col.sortable,
                        both: col.sortable,
                        asc: setting.order === col.field && setting.sort === 'asc',
                        desc: setting.order === col.field && setting.sort === 'desc',
                      }"
                      @click="col.sortable ? doSort(col.field) : false"
                    >
                      {{ col.label }}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="rows.length > 0">
                <template v-if="isStaticMode">
                  <tr v-for="(row, i) in localRows" :key="i" class="whitespace-nowrap">
                    <td v-if="hasCheckbox" class="px-6 py-4 text-sm text-gray-500">
                      <div>
                        <input
                          type="checkbox"
                          :ref="
                            (el) => {
                              rowCheckbox[i] = el;
                            }
                          "
                          :value="row[setting.keyColumn]"
                          @click="checked"
                        />
                      </div>
                    </td>
                    <td v-for="(col, j) in columns" :key="j" class="px-6 py-4 text-sm text-gray-500">
                        <!-- <slot :row="row" :col="col"></slot> -->
                      <div v-if="col.display" v-html="col.display(row)"></div>
                      <template v-else>
                        <div v-if="setting.isSlotMode && slots[col.field]">
                          <slot :name="col.field" :value="row"></slot>
                        </div>
                        <span v-else>{{ row[col.field] }}</span>
                      </template>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr v-for="(row, i) in rows" :key="i" class="whitespace-nowrap">
                    <td v-if="hasCheckbox" class="px-6 py-4 text-sm text-gray-500">
                      <div>
                        <input
                          type="checkbox"
                          :ref="
                            (el) => {
                              rowCheckbox[i] = el;
                            }
                          "
                          :value="row[setting.keyColumn]"
                          @click="checked"
                        />
                      </div>
                    </td>
                    <td v-for="(col, j) in columns" :key="j" class="px-6 py-4 text-sm text-gray-500">
                      <div v-if="col.display" v-html="col.display(row)"></div>
                      <div v-else>
                        <div v-if="setting.isSlotMode && slots[col.field]">
                          <slot :name="col.field" :value="row"></slot>
                        </div>
                        <span v-else>{{ row[col.field] }}</span>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex flex-wrap " v-if="rows.length == 0">
          <div class="sm:w-full pr-4 pl-4 text-center">
            {{ messages.noDataAvailable }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, onBeforeUpdate, nextTick, onMounted } from "vue";
interface tableSetting {
    isSlotMode: boolean;
    isCheckAll: boolean;
    keyColumn: string;
    order: string;
    sort: string;
}
interface column {
    isKey: string;
    field: string;
}
export default defineComponent({
    name: "my-table",
    emits: ["return-checked-rows", "do-search", "is-finished"],
    // components: { 'font-awesome-icon': FontAwesomeIcon },
    props: {
        // is data loading
        isLoading: { type: Boolean, require: true },
        // Presence of Checkbox
        hasCheckbox: { type: Boolean, default: false },
        // title
        title: { type: String, default: "" },
        // Field
        columns: {
            type: Array,
            default: () => {
                return [];
            },
        },
        // data
        rows: {
            type: Array,
            default: () => {
                return [];
            },
        },
        // Total number of transactions
        total: { type: Number, default: 100 },
        // Sort condition
        sortable: {
            type: Object,
            default: () => {
                return {
                order: "id",
                sort: "asc",
                };
            },
        },
        // Display text
        messages: {
            type: Object,
            default: () => {
                return {
                pagingInfo: "Showing {0}-{1} of {2}",
                pageSizeChangeLabel: "Row count:",
                gotoPageLabel: "Go to page:",
                noDataAvailable: "No data",
                };
            },
        },
        // Static mode(no refresh server data)
        isStaticMode: { type: Boolean, default: false },
        // V-slot mode
        isSlotMode: { type: Boolean, default: false }
    },
    setup(props, { emit, slots }) {
        let localTable = ref<HTMLElement | null>(null);
        // Internal set value for components
        const setting: tableSetting = reactive({
            // Enable slot mode
            isSlotMode: props.isSlotMode,
            // Whether to select all
            isCheckAll: false,
            // KEY field name
            keyColumn: computed(() => {
                let key = "";
                Object.assign(props.columns).forEach((col: column) => {
                    if (col.isKey) {
                        key = col.field;
                    }
                });
                return key;
            }),
            // Sortable for local
            order: props.sortable.order,
            sort: props.sortable.sort,
        });
        // Data rows for local
        const localRows = computed(() => {
            // sort rows
            let property = setting.order;
            let sort_order = 1;
            if (setting.sort === "desc") {
                sort_order = -1;
            }
            let rows = props.rows as Array<unknown>;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            rows.sort((a: any, b: any): number => {
                if (a[property] < b[property]) {
                    return -1 * sort_order;
                } else if (a[property] > b[property]) {
                    return sort_order;
                } else {
                    return 0;
                }
            });
            // return sorted and offset rows
            let result = [];
            for (let index = 0; index < props.total; index++) {
                if (rows[index]) {
                    result.push(rows[index]);
                }
            }
            nextTick(function () {
                callIsFinished();
            });
            return result;
        });
        ////////////////////////////
        //
        //  Checkbox
        //  (Checkbox related operations)
        //
        // Define Checkbox reference
        const rowCheckbox = ref([]);
        if (props.hasCheckbox) {
            /**
             * Execute before re-rendering
             */
            onBeforeUpdate(() => {
                // Clear all values before each update
                rowCheckbox.value = [];
            });
            /**
             * Check all checkboxes for monitoring
             */
            watch(
                () => setting.isCheckAll,
                (state: boolean) => {
                let isChecked: Array<string> = [];
                rowCheckbox.value.forEach((val: HTMLInputElement) => {
                    if (val) {
                        val.checked = state;
                        if (val.checked) {
                            isChecked.push(val.value);
                        }
                    }
                });
                // Return the selected data on the screen
                emit("return-checked-rows", isChecked);
                }
            );
        }
        /**
         * Checkbox click event
         */
        const checked = () => {
            let isChecked: Array<string> = [];
            rowCheckbox.value.forEach((val: HTMLInputElement) => {
                if (val && val.checked) {
                    isChecked.push(val.value);
                }
            });
            // Return the selected data on the screen
            emit("return-checked-rows", isChecked);
        };
        /**
         * Clear all selected data on the screen
         */
        const clearChecked = () => {
            rowCheckbox.value.forEach((val: HTMLInputElement) => {
                if (val && val.checked) {
                    val.checked = false;
                }
            });
            // Return the selected data on the screen
            emit("return-checked-rows", []);
        };
        ////////////////////////////
        //
        //  (Sorting, page change, etc. related operations)
        //
        /**
         * Call execution sequencing
         */
        const doSort = (order: string) => {
            let sort = "asc";
            if (order == setting.order) {
                // When sorting items
                if (setting.sort == "asc") {
                    sort = "desc";
                }
            }
            //   let offset = (setting.page - 1) * setting.pageSize;
            //   let limit = setting.pageSize;
            setting.order = order;
            setting.sort = sort;
            emit("do-search", order, sort);
            // Clear the selected data on the screen
            if (setting.isCheckAll) {
                // It will be cleared when you cancel all selections
                setting.isCheckAll = false;
            } else {
                if (props.hasCheckbox) {
                    clearChecked();
                }
            }
        };

        watch(
            () => props.rows,
            () => {
                nextTick(function () {
                    // Return the private components after the data is rendered
                    if (!props.isStaticMode) {
                        callIsFinished();
                    }
                });
            }
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stringFormat = (template: string, ...args: any[]) => {
            return template.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != "undefined" ? args[number] : match;
            });
        };
        // Call 「is-finished」 Method
        const callIsFinished = () => {
            if (localTable.value) {
                let localElement = localTable.value.getElementsByClassName("is-rows-el");
                emit("is-finished", localElement);
            }
        };
        /**
         * Mounted Event
         */
        onMounted(() => {
            nextTick(() => {
                if (props.rows.length > 0) {
                    callIsFinished();
                }
            });
        });
        if (props.hasCheckbox) {
            // When Checkbox is needed
            return {
                slots,
                localTable,
                localRows,
                setting,
                rowCheckbox,
                checked,
                doSort,
                // prevPage,
                // movePage,
                // nextPage,
                stringFormat,
            };
        } else {
            return {
                slots,
                localTable,
                localRows,
                setting,
                doSort,
                // prevPage,
                // movePage,
                // nextPage,
                stringFormat,
            };
        }
    },
});
</script>

<style scoped>
.checkbox-th {
  width: 1%;
}
.both {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAkElEQVQoz7X QMQ5AQBCF4dWQSJxC5wwax1Cq1e7BAdxD5SL+Tq/QCM1oNiJidwox0355mXnG/DrEtIQ6azioNZQxI0ykPhTQIwhCR+BmBYtlK7kLJYwWCcJA9M4qdrZrd8pPjZWPtOqdRQy320YSV17OatFC4euts6z39GYMKRPCTKY9UnPQ6P+GtMRfGtPnBCiqhAeJPmkqAAAAAElFTkSuQmCC");
}
.sortable {
  cursor: pointer;
  background-position: right;
  background-repeat: no-repeat;
  padding-right: 30px !important;
}
.asc {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBdqEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVoAADeemwtPcZI2wAAAABJRU5ErkJggg==);
}
.desc {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWjYBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJzcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII=);
}
.loading-mask {
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-flow: column;
  transition: opacity 0.3s ease;
}
.loading-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
/*.loading-icon {*/
/*  display: flex;*/
/*  margin-left: auto;*/
/*  margin-right: auto;*/
/*}*/
.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  padding: 20px;
}
select {
  width: auto;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  height: auto;
  padding: 0;
  margin-bottom: 0;
}
table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
}
th {
  text-align: inherit;
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
.table .thead-dark th {
  color: #fff;
  background-color: #343a40;
  border-color: #454d55;
}
.table-bordered thead td,
.table-bordered thead th {
  border-bottom-width: 2px;
}
.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}
.table-bordered td,
.table-bordered th {
  border: 1px solid #dee2e6;
}
.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
/*.table-border {*/
/*  border: 1px solid #dee2e6;*/
/*}*/
.table td,
.table th {
  vertical-align: middle;
}
.table-bordered td,
.table-bordered th {
  border: 1px solid #dee2e6;
}
.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
div.dataTables_wrapper div.dataTables_paginate {
  margin: 0;
  white-space: nowrap;
  text-align: right;
}
div.dataTables_wrapper div.dataTables_paginate ul.pagination {
  margin: 2px 0;
  white-space: nowrap;
  justify-content: flex-end;
}
.pagination {
  display: -ms-flexbox;
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}
.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
  background-color: #fff;
  border-color: #dee2e6;
}
.page-item:first-child .page-link {
  margin-left: 0;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #dee2e6;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
*,
::after,
::before {
  box-sizing: border-box;
}
@media (min-width: 576px) {
  .col-sm-12 {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
  }
}
@media (min-width: 768px) {
  .col-md-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}
</style>