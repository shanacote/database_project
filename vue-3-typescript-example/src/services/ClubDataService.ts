import http from "@/http-common";

class ClubDataService {
    getAll(): Promise<any> {
        return http.get("/club");
    }

    get(id: any): Promise<any> {
        return http.get(`/club/${id}`);
    }

    create(data: any): Promise<any> {
        return http.post("/club", data);
    }

    update(id: any, data: any): Promise<any> {
        return http.put(`/club/${id}`, data);
    }

    delete(id: any): Promise<any> {
        return http.delete(`/club/${id}`);
    }

}

export default new ClubDataService();