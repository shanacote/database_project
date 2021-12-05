import http from "@/http-common";

class StudentSportRelationDataService {
    getAll(): Promise<any> {
        return http.get("/student_sport_relation");
    }

    get(id: any): Promise<any> {
        return http.get(`/student_sport_relation/${id}`);
    }

    create(data: any): Promise<any> {
        return http.post("/student_sport_relation", data);
    }

    update(id: any, data: any): Promise<any> {
        return http.put(`/student_sport_relation/${id}`, data);
    }

    delete(id: any): Promise<any> {
        return http.delete(`/student_sport_relation/${id}`);
    }

    deleteAll(): Promise<any> {
        return http.delete(`/student_sport_relation`);
    }

    findByTitle(title: string): Promise<any> {
        return http.get(`/student_sport_relation?title=${title}`);
    }
}

export default new StudentSportRelationDataService();