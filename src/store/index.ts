import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { weather } from "@/store/modules/weather";

export interface RootState {
  user?: any
}

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  strict: true,
  modules: {
    weather,
  },
  state: {},
};

export default new Vuex.Store<RootState>(store);
