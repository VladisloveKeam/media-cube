import api from '@/js/utils/api';
import Employee from "../../models/employee/employee";

const url = 'employees';

const state = {
    employees: [],
    employee: null,
    loading: false,
    errors: {}
};

const getters = {
    employees: (state) => state.employees,
    employee: (state) => state.employee,
    loading: (state) => state.loading,
    errors: (state) => state.errors
};

const mutations = {
    RESET_ERRORS(state) {
        Object.assign(state, {
            errors: {}
        })
    },

    FETCH_EMPLOYEES_REQUEST(state) {
        Object.assign(state, {loading: true});
    },

    FETCH_EMPLOYEES_SUCCESS(state, payload) {
        const employees = payload.employees.map(item => {
            return new Employee(item);
        });

        Object.assign(state, {
            employees: employees,
            loading: false
        });
    },

    FETCH_EMPLOYEES_FAILURE(state) {
        Object.assign(state, {loading: false})
    },

    FETCH_EMPLOYEE_REQUEST(state) {
        Object.assign(state, {loading: true});
    },

    FETCH_EMPLOYEE_SUCCESS(state, payload) {
        Object.assign(state, {
            employee: payload.employee,
            loading: false
        });
    },

    FETCH_EMPLOYEE_FAILURE(state) {
        Object.assign(state, {loading: false})
    },

    STORE_EMPLOYEE_REQUEST(state) {
        Object.assign(state, {loading: true});
    },

    STORE_EMPLOYEE_SUCCESS(state, payload) {
        Object.assign(state, {
            employee: payload.employee,
            loading: false,
            errors: {}
        });
    },

    STORE_EMPLOYEE_FAILURE(state, error) {
        Object.assign(state, {
            loading: false,
            errors: api.getValidationErrors(error)
        });
    },

    UPDATE_EMPLOYEE_REQUEST(state) {
        Object.assign(state, {loading: true});
    },

    UPDATE_EMPLOYEE_SUCCESS(state, payload) {
        Object.assign(state, {
            employee: payload.employee,
            loading: false,
            errors: {}
        });
    },

    UPDATE_EMPLOYEE_FAILURE(state, error) {
        Object.assign(state, {
            loading: false,
            errors: api.getValidationErrors(error)
        })
    },

    DESTROY_EMPLOYEE_REQUEST(state) {
        Object.assign(state, {loading: true});
    },

    DESTROY_EMPLOYEE_SUCCESS(state) {
        Object.assign(state, {loading: false, errors: {}});
    },

    DESTROY_EMPLOYEE_FAILURE(state) {
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

    fetchEmployees({commit}) {
        commit('FETCH_EMPLOYEES_REQUEST');

        return api.get(url)
            .then(response => {
                commit('FETCH_EMPLOYEES_SUCCESS', {
                    employees: response.data
                });
                return Promise.resolve(response.data)
            })
            .catch(error => {
                commit('FETCH_EMPLOYEES_FAILURE', error);
                return Promise.reject(error)
            });
    },

    fetchEmployee({commit}, payload) {
        commit('FETCH_EMPLOYEE_REQUEST');

        const id = payload.id;

        return api.get(`${url}/${id}`)
            .then(response => {
                commit('FETCH_EMPLOYEE_SUCCESS', {
                    employee: new Employee(response.data)
                });
                return Promise.resolve(response);
            })
            .catch(error => {
                commit('FETCH_EMPLOYEE_FAILURE', error);
                return Promise.reject(error);
            });
    },


    storeEmployee({commit}, payload) {
        commit('STORE_EMPLOYEE_REQUEST');

        return api.post(url, payload)
            .then(response => {
                commit('STORE_EMPLOYEE_SUCCESS', {
                    employee: new Employee(response.data)
                });
                return Promise.resolve(response);
            })
            .catch(error => {
                commit('STORE_EMPLOYEE_FAILURE', error);
                return Promise.reject(error);
            });
    },

    updateEmployee({commit}, payload) {
        commit('UPDATE_EMPLOYEE_REQUEST');

        const id = payload.id;
        delete payload.id;

        return api.put(`${url}/${id}`, payload)
            .then(response => {
                commit('UPDATE_EMPLOYEE_SUCCESS', {
                    employee: new Employee(response.data)
                });
                return Promise.resolve(response);
            })
            .catch(error => {
                commit('UPDATE_EMPLOYEE_FAILURE', error);
                return Promise.reject(error);
            });
    },

    destroyEmployees({commit}, payload) {
        commit('DESTROY_EMPLOYEE_REQUEST');

        return api.delete(url, payload)
            .then(response => {
                commit('DESTROY_EMPLOYEE_SUCCESS');
                return Promise.resolve(response);
            })
            .catch(error => {
                commit('DESTROY_EMPLOYEE_FAILURE', error);
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