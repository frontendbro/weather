import axios from "axios";
import { ActionTree, GetterTree, MutationTree, Module } from "vuex";
import { RootState } from "@/store";
import { WeatherState } from "./weather.d";

const state: WeatherState = {
  data: {},
  dataLoading: false,
};

const actions: ActionTree<WeatherState, RootState> = {
  GetData: ({ commit }, payload) => {
    commit("GET_WEATHER_DATA_LOADING", true);
    return axios
      .get(
        "http://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            q: "Moscow",
            appid: "94d75bb6a93fbf5a66591f211f0df822"
          }
        }
      )
      .then((res) => {
        if (!res.data.error) {
          commit("SET_WEATHER_DATA", res.data);
        } else {
          throw res.data;
        }
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        commit("GET_WEATHER_DATA_LOADING", false);
      });
  },
};

const mutations: MutationTree<WeatherState> = {
  GET_WEATHER_DATA_LOADING(state, payload) {
    state.dataLoading = payload;
  },
  SET_WEATHER_DATA(state, payload) {
    state.data = payload;
  },
};

export const weather: Module<WeatherState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};
