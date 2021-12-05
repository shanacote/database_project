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

    deleteAll(): Promise<any> {
        return http.delete(`/club`);
    }

    findByTitle(title: string): Promise<any> {
        return http.get(`/club?title=${title}`);
    }
}

export default new ClubDataService();