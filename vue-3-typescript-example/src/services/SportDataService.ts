import http from "@/http-common";

class SportDataService {
    getAll(): Promise<any> {
        return http.get("/sport");
    }

    get(id: any): Promise<any> {
        return http.get(`/sport/${id}`);
    }

    create(data: any): Promise<any> {
        return http.post("/sport", data);
    }

    update(id: any, data: any): Promise<any> {
        return http.put(`/sport/${id}`, data);
    }

    delete(id: any): Promise<any> {
        return http.delete(`/sport/${id}`);
    }
}

export default new SportDataService();