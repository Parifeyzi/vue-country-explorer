import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    countries: [],
    darkMode: false,
    isLoading: false,
  },
  mutations: {
    SET_COUNTRIES(state, countries) {
      state.countries = countries;
    },
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async fetchCountries({ commit }) {
      try {
        commit('SET_LOADING', true);
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population');
        commit('SET_COUNTRIES', response.data);
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchFilteredCountries({ commit }, { searchTerm, selectedRegion }) {
      try {
        commit('SET_LOADING', true);
        let url = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population';

        if (selectedRegion) {
          url = `https://restcountries.com/v3.1/region/${selectedRegion.toLowerCase()}?fields=name,flags,capital,region,population`;
        }

        if (searchTerm) {
          url = `https://restcountries.com/v3.1/name/${searchTerm.toLowerCase()}?fields=name,flags,capital,region,population`;
        }

        const response = await axios.get(url);
        commit('SET_COUNTRIES', response.data);
      } catch (error) {
        console.error(error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    toggleDarkMode({ commit }) {
      commit('TOGGLE_DARK_MODE');
    },
  },
  getters: {
    countries: (state) => state.countries,
    darkMode: (state) => state.darkMode,
    isLoading: (state) => state.isLoading,
  },
});