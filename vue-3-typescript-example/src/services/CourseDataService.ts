import http from "@/http-common";

class CourseDataService {
    getAll(): Promise<any> {
        return http.get("/course");
    }

    get(id: any): Promise<any> {
        return http.get(`/course/${id}`);
    }

    create(data: any): Promise<any> {
        return http.post("/course", data);
    }

    update(id: any, data: any): Promise<any> {
        return http.put(`/course/${id}`, data);
    }

    delete(id: any): Promise<any> {
        return http.delete(`/course/${id}`);
    }

    deleteAll(): Promise<any> {
        return http.delete(`/course`);
    }

    findByTitle(title: string): Promise<any> {
        return http.get(`/course?title=${title}`);
    }
}

export default new CourseDataService();