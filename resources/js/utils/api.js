const apiUrl = '/api/v1/';
const validationErrorStatus = 422;

export default {
    get (url, request) {
        return axios.get(`${apiUrl}${url}`, request)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    },

    post(url, request) {
        return axios.post(`${apiUrl}${url}`, request)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    },

    patch(url, request) {
        return axios.patch(`${apiUrl}${url}`, request)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    },

    delete(url, request) {
        return axios.delete(`${apiUrl}${url}/delete`, request)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    },

    put(url, request) {
        return axios.put(`${apiUrl}${url}`, request)
            .then(response => Promise.resolve(response.data))
            .catch(error => Promise.reject(error));
    },

    getValidationErrors(error){
        if(error.response.status !== validationErrorStatus){
            return {};
        }

        return error.response.data.error.errors;
    }
}