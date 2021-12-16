// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/auth/';
import StudentDataService from "@/services/StudentDataService";
import ResponseData from "@/types/ResponseData";
import Student from "@/types/Student";

class AuthService {
    login(user: Student): Promise<Student> {
        return new Promise<Student>((resolve, reject) => {
            return StudentDataService.getAll()
                .then((response: ResponseData) => {
                    const student:Student=response.data.find((e:any)=>e.student_id==user.student_id);
                    if(student.password===user.password) {
                        localStorage.setItem('user', JSON.stringify(student));
                        resolve(student);
                    } else {
                        reject(new Error('Wrong user or password'))
                    }
                })
                .catch((e: Error) => {
                    reject(e);
                    console.log(e);
                });
        });
    }

    logout():void {
        localStorage.removeItem('user');
    }

//   register(user) {
//     return axios.post(API_URL + 'signup', {
//       username: user.username,
//       email: user.email,
//       password: user.password
//     });
//   }
}

export default new AuthService();
