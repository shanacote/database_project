import http from "@/http-common";

class StudentClubRelationDataService {
    getAll(): Promise<any> {
        return http.get("/student_club_relation");
    }

    get(id: any): Promise<any> {
        return http.get(`/student_club_relation/${id}`);
    }

    create(data: any): Promise<any> {
        return http.post("/student_club_relation", data);
    }

    update(id: any, data: any): Promise<any> {
        return http.put(`/student_club_relation/${id}`, data);
    }

    delete(id: any): Promise<any> {
        return http.delete(`/student_club_relation/${id}`);
    }

    deleteAll(): Promise<any> {
        return http.delete(`/student_club_relation`);
    }

    findByTitle(title: string): Promise<any> {
        return http.get(`/student_club_relation?title=${title}`);
    }
}

export default new StudentClubRelationDataService();