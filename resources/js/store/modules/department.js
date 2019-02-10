import api from '@/js/utils/api';
import Department from "../../models/department/department";

const url = 'departments';

const state = {
    departments: [],
    department: null,
    loading: false,
    errors: {}
};

const getters = {
    departments: (state) => state.departments,
    department: (state) => state.department,
    loading: (state) => state.loading,
    errors: (state) => state.errors
};

const mutations = {
    RESET_ERRORS(state) {
        Object.assign(state, {
            errors: {}
        })
    },

    FETCH_DEPARTMENTS_REQUEST(state) {
        Object.assign(state, {loading: true});
    },

    FETCH_DEPARTMENTS_SUCCESS(state, payload) {
        const departments = payload.departments.map(item => {
            return new Department(item);
        });

        Object.assign(state, {
            departments: departments,
            loading: false
        });
    },

    FETCH_DEPARTMENTS_FAILURE(state) {
        Object.assign(state, {loading: false})
    },

    FETCH_DEPARTMENT_REQUEST(state) {
        Object.assign(state, {loading: true});
    },

    FETCH_DEPARTMENT_SUCCESS(state, payload) {
        Object.assign(state, {
            department: payload.department,
            loading: false
        });
    },

    FETCH_DEPARTMENT_FAILURE(state) {
        Object.assign(state, {loading: false})
    },

    STORE_DEPARTMENT_REQUEST(state) {
        Object.assign(state, {loading: true});
    },

    STORE_DEPARTMENT_SUCCESS(state, payload) {
        Object.assign(state, {
            department: payload.department,
            loading: false,
            errors: {}
        });
    },

    STORE_DEPARTMENT_FAILURE(state, error) {
        Object.assign(state, {
            loading: false,
            errors: api.getValidationErrors(error)
        });
    },

    UPDATE_DEPARTMENT_REQUEST(state) {
        Object.assign(state, {loading: true});
    },

    UPDATE_DEPARTMENT_SUCCESS(state, payload) {
        Object.assign(state, {
            department: payload.department,
            loading: false,
            errors: {}
        });
    },

    UPDATE_DEPARTMENT_FAILURE(state, error) {
        Object.assign(state, {
            loading: false,
            errors: api.getValidationErrors(error)
        })
    },

    DESTROY_DEPARTMENT_REQUEST(state) {
        Object.assign(state, {loading: true});
    },

    DESTROY_DEPARTMENT_SUCCESS(state) {
        Object.assign(state, {loading: false, errors: {}});
    },

    DESTROY_DEPARTMENT_FAILURE(state, error) {
        Object.assign(state, {
            loading: false,
            errors: api.getValidationErrors(error)
        });
    },

};

const actions = {
    resetErrors({commit}) {
        commit('RESET_ERRORS');
    },

    fetchDepartments({commit}) {
        commit('FETCH_DEPARTMENTS_REQUEST');

        return api.get(url)
            .then(response => {
                commit('FETCH_DEPARTMENTS_SUCCESS', {
                    departments: response.data
                });
                return Promise.resolve(response.data)
            })
            .catch(error => {
                commit('FETCH_DEPARTMENTS_FAILURE', error);
                return Promise.reject(error)
            });
    },

    fetchDepartment({commit}, payload) {
        commit('FETCH_DEPARTMENT_REQUEST');

        const id = payload.id;

        return api.get(`${url}/${id}`)
            .then(response => {
                commit('FETCH_DEPARTMENT_SUCCESS', {
                    department: new Department(response.data)
                });
                return Promise.resolve(response);
            })
            .catch(error => {
                commit('FETCH_DEPARTMENT_FAILURE', error);
                return Promise.reject(error);
            });
    },


    storeDepartment({commit}, payload) {
        commit('STORE_DEPARTMENT_REQUEST');

        return api.post(url, payload)
            .then(response => {
                commit('STORE_DEPARTMENT_SUCCESS', {
                    department: new Department(response.data)
                });
                return Promise.resolve(response);
            })
            .catch(error => {
                commit('STORE_DEPARTMENT_FAILURE', error);
                return Promise.reject(error);
            });
    },

    updateDepartment({commit}, payload) {
        commit('UPDATE_DEPARTMENT_REQUEST');

        const id = payload.id;
        delete payload.id;

        return api.put(`${url}/${id}`, payload)
            .then(response => {
                commit('UPDATE_DEPARTMENT_SUCCESS', {
                    department: new Department(response.data)
                });
                return Promise.resolve(response);
            })
            .catch(error => {
                commit('UPDATE_DEPARTMENT_FAILURE', error);
                return Promise.reject(error);
            });
    },

    destroyDepartments({commit}, payload) {
        commit('DESTROY_DEPARTMENT_REQUEST');

        return api.delete(url, payload)
            .then(response => {
                commit('DESTROY_DEPARTMENT_SUCCESS');
                return Promise.resolve(response);
            })
            .catch(error => {
                commit('DESTROY_DEPARTMENT_FAILURE', error);
                return Promise.reject(error);
            });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}