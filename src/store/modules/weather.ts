import axios from "axios";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { RootState } from "@/store";
import { WeatherState } from "./weather.d";

const state: WeatherState = {
  data: {
    list: []
  },
  dataLoading: false,
  citiesList: [],
  citiesListLoading: false
};

const getters: GetterTree<WeatherState, RootState> = {
  byDays: state => {
    const chunkSize = 8;
    const arr = state.data.list;
    return arr.map((e: any, i: any) => {
      return i % chunkSize === 0 ? arr.slice(i, i + chunkSize) : null;
    }).filter((e: any) => e);
  }
}

const actions: ActionTree<WeatherState, RootState> = {
  GetData: ({commit}, payload) => {
    commit("GET_WEATHER_DATA_LOADING", true);
    return axios
      .get(
        "http://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            q: payload,
            appid: "94d75bb6a93fbf5a66591f211f0df822",
            units: 'metric'
          }
        }
      )
      .then(res => {
        if (!res.data.error) {
          commit("SET_WEATHER_DATA", res.data);
          return res.data;
        } else {
          throw res.data;
        }
      })
      .catch(err => {
        throw err;
      })
      .finally(() => {
        commit("GET_WEATHER_DATA_LOADING", false);
      });
  },
  GetCities: ({ commit }, payload) => {
    commit("GET_CITIES_LIST_LOADING", true);
    return axios
      .get(
        "http://autocomplete.travelpayouts.com/places2",
        {
          params: {
            term: payload,
            locale: "ru",
            "types[]": "city",
          }
        })
      .then(res => {
        if (!res.data.error) {
          commit("SET_CITIES_LIST", res.data);
          return res.data;
        } else {
          throw res.data;
        }
      })
      .catch(err => {
        throw err;
      })
      .finally(() => {
        commit("GET_CITIES_LIST_LOADING", false);
      });
  }
};

const mutations: MutationTree<WeatherState> = {
  GET_WEATHER_DATA_LOADING(state, payload) {
    state.dataLoading = payload;
  },
  SET_WEATHER_DATA(state, payload) {
    state.data = payload;
  },
  GET_CITIES_LIST_LOADING(state, payload) {
    state.citiesListLoading = payload;
  },
  SET_CITIES_LIST(state, payload) {
    state.citiesList = payload;
  }
};

export const weather: Module<WeatherState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
