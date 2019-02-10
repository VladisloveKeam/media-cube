import Vue from 'vue';
import Vuex from 'vuex';

//modules
import department from '@/js/store/modules/department';
import employee from '@/js/store/modules/employee';
import notification from '@/js/store/modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        department,
        employee,
        notification,
    },
})