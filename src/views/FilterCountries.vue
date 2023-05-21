<script>
import { mapActions, mapState } from "vuex";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  data() {
    return {
      searchTerm: "",
      selectedRegion: "",
    };
  },
  setup() {
    const darkMode = ref(false);
    const store = useStore();

    store.watch(
      () => store.getters.darkMode,
      (value) => {
        darkMode.value = value;
      }
    );

    return {
      darkMode,
    };
  },

  methods: {
    ...mapActions(["toggleDarkMode", "fetchFilteredCountries"]),
    filterCountries() {
      this.fetchFilteredCountries({
        searchTerm: this.searchTerm,
        selectedRegion: this.selectedRegion,
      });
    },
  },
  mounted() {
    this.toggleDarkMode();
  },
};
</script>

<template>
  <div :class="['container-wrapper py-4', {'dark:bg-darkMain': darkMode }]">
    <div class="container mx-auto flex items-center justify-between py-4">
      <div class="flex items-center">
        <input
          type="text"
          :class="['w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500', {'dark:bg-darkMain': darkMode }]"
          placeholder="Search..."
          v-model="searchTerm"
          @input="filterCountries"
        />
      </div>
      <div class="w-1/2 flex items-center justify-end">
        <select
          class="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          :class="['px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500', {'dark:bg-darkMain': darkMode }]"
          v-model="selectedRegion"
          @change="filterCountries"
          placeholder="Filter by Region"
        >
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style>
.dark\:bg-darkMain {
  background-color: #202d36;
  color: white;
}
</style>