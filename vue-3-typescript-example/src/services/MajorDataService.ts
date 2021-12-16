import http from "@/http-common";

class MajorDataService {
    getAll(): Promise<any> {
        return http.get("/major");
    }

    get(id: any): Promise<any> {
        return http.get(`/major/${id}`);
    }

    create(data: any): Promise<any> {
        return http.post("/major", data);
    }

    update(id: any, data: any): Promise<any> {
        return http.put(`/major/${id}`, data);
    }

    delete(id: any): Promise<any> {
        return http.delete(`/major/${id}`);
    }

}

export default new MajorDataService();