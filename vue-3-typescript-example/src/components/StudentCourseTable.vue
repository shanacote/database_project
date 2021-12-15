<template>
    <table-lite
        :is-slot-mode="true"
        :title= "'Your Courses'"
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
                <button type="button" @click="deleteClicked(data.value.course_id)" data-id="{{data.value[col.field]}}" ><font-awesome-icon :icon="['fas', 'trash-alt']" /></button>
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
import StudentCourseRelationDataService from "@/services/StudentCourseRelationDataService";
import MajorDataService from "@/services/MajorDataService";
import CourseDataService from "@/services/CourseDataService";
import Course from "@/types/Course";
import Major from "@/types/Major";
import StudentCourseRelation from "@/types/StudentCourseRelation";
import ResponseData from "@/types/ResponseData";

const table = reactive({
    isLoading: true,
    columns: [
        {
            label: "school_code",
            field: "school_code",
            width: "20%",
            sortable: true
        },
        {
            label: "Major",
            field: "major_id",
            width: "20%",
            sortable: true,
            display: function (row: any) {
                const major:Major=table.majors.find((e:Major)=>e.major_id===row.major_id)!;
                return (
                    '<span>'+major.name+'</span>'
                );
            }
        },
        {
            label: "course_code",
            field: "course_code",
            width: "15%",
            sortable: true,
        },
        {
            label: "name",
            field: "name",
            width: "20%",
            sortable: true,
        },
        {
            label: "",
            field: "quick",
            width: "5%",
        }
    ],
    rows: [] as Array<StudentCourseExpanded>,
    majors: [] as Array<Major>,
    courses: [] as Array<Course>,
    showEditModal: false,
    currentStudentId: -1,
    totalRecordCount: 0,
    sortable: {
        order: "student_id",
        sort: "asc",
    }
});

interface StudentCourseExpanded {
    student_id: number;
    course_id: number;
    school_code: string;
    major_id: number;
    course_code: string;
    name: string;
}

export default defineComponent({
    name: "StudentCourseTable",
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
        deleteClicked: function(course_id:number) {
            console.log(`delete clicked for student:${this.currentUser()}, course:${course_id}`);
            StudentCourseRelationDataService.delete(this.currentUser(), course_id)
                .then((response: ResponseData) => {
                    console.log(response.data);
                    const idx=table.rows.findIndex((e:StudentCourseExpanded)=>e.course_id===course_id);
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
            MajorDataService.getAll().then((response: ResponseData) => {
                table.majors=response.data;
            });
            CourseDataService.getAll().then((response: ResponseData) => {
                table.courses=response.data;
                StudentCourseRelationDataService.getAll().then((response: ResponseData) => {
                    // this.students = response.data;
                    console.log(response.data);
                    table.rows = [];
                    // refresh table rows
                    for(let i=0; i<response.data.length; i++) {
                        const scr:StudentCourseRelation = response.data[i];
                        if(scr.student_id===loggedUser) {
                            const c:Course=table.courses.find(e=>e.course_id===scr.course_id)!;
                            table.rows.push({
                                student_id:scr.student_id,
                                course_id: scr.course_id,
                                school_code: c.school_code,
                                major_id: c.major_id,
                                course_code: c.course_code,
                                name: c.name
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
            const self2=ref(null);
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
