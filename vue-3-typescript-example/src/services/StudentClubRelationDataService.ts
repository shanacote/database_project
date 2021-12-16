import http from "@/http-common";

const ENDPOINT='student_club_relation';
class StudentClubRelationDataService {
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

    delete(student_id: any, club_id: any): Promise<any> {
        return http.delete(`${ENDPOINT}?student_id=${student_id}&club_id=${club_id}`);
    }

}

export default new StudentClubRelationDataService();