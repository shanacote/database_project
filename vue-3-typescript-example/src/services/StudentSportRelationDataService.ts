import http from "@/http-common";

const ENDPOINT='student_sport_relation';
class StudentSportRelationDataService {
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

    delete(student_id: any, sport_id: any): Promise<any> {
        return http.delete(`${ENDPOINT}?student_id=${student_id}&sport_id=${sport_id}`);
    }

}

export default new StudentSportRelationDataService();