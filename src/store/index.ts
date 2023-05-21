import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    countries: [],
    darkMode: false,

  },
  mutations: {
    SET_COUNTRIES(state, countries) {
      state.countries = countries;
    },
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode;
    },
  },
  actions: {
    async fetchCountries({ commit }) {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population');
        commit('SET_COUNTRIES', response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    countries: (state) => state.countries,
    darkMode: (state) => state.darkMode,
  },
});