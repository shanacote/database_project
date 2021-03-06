import http from "@/http-common";

class StudentDataService {
    getAll(): Promise<any> {
        return http.get("/student");
    }

    get(id: any): Promise<any> {
        return http.get(`/student/${id}`);
    }

    create(data: any): Promise<any> {
        return http.post("/student", data);
    }

    update(id: any, data: any): Promise<any> {
        return http.put(`/student/${id}`, data);
    }

    delete(id: any): Promise<any> {
        return http.delete(`/student/${id}`);
    }

}

export default new StudentDataService();