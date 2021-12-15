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
        return http.delete(`${ENDPOINT}/${student_id}/${sport_id}`);
    }

    deleteAll(): Promise<any> {
        return http.delete(ENDPOINT);
    }

    findByTitle(title: string): Promise<any> {
        return http.get(`${ENDPOINT}?title=${title}`);
    }
}

export default new StudentSportRelationDataService();