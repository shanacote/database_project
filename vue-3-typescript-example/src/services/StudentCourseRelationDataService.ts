import http from "@/http-common";

const ENDPOINT='student_courses_relation';
class StudentCourseRelationDataService {
    getAll(): Promise<any> {
        return http.get(ENDPOINT);
    }

    get(id: any): Promise<any> {
        return http.get(`${ENDPOINT}/${id}`);
    }

    create(data: any): Promise<any> {
        return http.post(ENDPOINT, data);
    }

    update(id: any, data: any): Promise<any> {
        return http.put(`${ENDPOINT}/${id}`, data);
    }

    delete(student_id: any, course_id: any): Promise<any> {
        return http.delete(`${ENDPOINT}?student_id=${student_id}&course_id=${course_id}`);
    }

}

export default new StudentCourseRelationDataService();