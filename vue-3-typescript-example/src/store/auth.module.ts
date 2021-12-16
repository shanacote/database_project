import AuthService from '../services/auth.service';
import Student from "@/types/Student";

const user = JSON.parse(localStorage.getItem('user')!);
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }:any, user:Student) {
        return AuthService.login(user).then(
            user => {
                commit('loginSuccess', user);
                return Promise.resolve(user);
            },
            error => {
                commit('loginFailure');
                return Promise.reject(error);
            }
        );
        },
        logout({ commit }: any) {
            AuthService.logout();
            commit('logout');
        },
        // register({ commit }, user) {
        //   return AuthService.register(user).then(
        //     response => {
        //       commit('registerSuccess');
        //       return Promise.resolve(response.data);
        //     },
        //     error => {
        //       commit('registerFailure');
        //       return Promise.reject(error);
        //     }
        //   );
        // }
    },
    mutations: {
        loginSuccess(state:any, user:Student) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state:any) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state:any) {
            state.status.loggedIn = false;
            state.user = null;
        },
        // registerSuccess(state) {
        //   state.status.loggedIn = false;
        // },
        // registerFailure(state) {
        //   state.status.loggedIn = false;
        // }
    }
};
