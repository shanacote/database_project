import http from "@/http-common";

class StudentCourseRelationDataService {
    getAll(): Promise<any> {
        return http.get("/student_course_relation");
    }

    get(id: any): Promise<any> {
        return http.get(`/student_course_relation/${id}`);
    }

    create(data: any): Promise<any> {
        return http.post("/student_course_relation", data);
    }

    update(id: any, data: any): Promise<any> {
        return http.put(`/student_course_relation/${id}`, data);
    }

    delete(id: any): Promise<any> {
        return http.delete(`/student_course_relation/${id}`);
    }

    deleteAll(): Promise<any> {
        return http.delete(`/student_course_relation`);
    }

    findByTitle(title: string): Promise<any> {
        return http.get(`/student_course_relation?title=${title}`);
    }
}

export default new StudentCourseRelationDataService();