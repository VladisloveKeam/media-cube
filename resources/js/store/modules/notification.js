const state = {
    enabled: false,
    text: '',
    color: 'success',
    timeout: 1500,
};

const getters = {
    notification: (state) => state
};

const mutations = {
    SHOW_NOTIFICATION(state, payload){
        Object.assign(state, {
            enabled: true,
            text: payload.text ? payload.text : state.text,
            timeout: payload.timeout ? payload.timeout : state.timeout,
            color: payload.color ? payload.color : state.color
        })
    }
};

const actions = {
    showNotification({commit}, payload){
        const params = {
            text: payload.text,
            color: payload.color
        };

        commit('SHOW_NOTIFICATION', params);
    },

    showNotificationSuccess({commit}){
        const params = {
            text: 'Информация успешно сохранена',
            color: 'success'
        };

        commit('SHOW_NOTIFICATION', params);
    },

    showNotificationError({commit}){
        const params = {
          text: 'Произошла ошибка',
          color: 'error'
        };

        commit('SHOW_NOTIFICATION', params);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}