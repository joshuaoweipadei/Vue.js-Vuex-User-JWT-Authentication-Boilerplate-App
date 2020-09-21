import Vue from "vue";
import Vuex from "vuex";

import { account } from './account.module';
import { users } from './users.module';
import { alert } from './alert.module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        account,
        users,
        alert
    }
});
