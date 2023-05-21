<script>
import { mapActions } from "vuex";
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
    const isLoading = ref(false);
    const store = useStore();

    store.watch(
      () => store.getters.darkMode,
      (value) => {
        darkMode.value = value;
      }
    );

    store.watch(
    () => store.state.countries,
    (value) => {
      isLoading.value = false;
    }
  );

    return {
      darkMode,
      isLoading
    };
  },

  methods: {
    ...mapActions(["toggleDarkMode", "fetchFilteredCountries"]),
    filterCountries() {
      this.isLoading = true;
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
  <div :class="['container-wrapper py-4', { 'dark:bg-darkMain': darkMode }]">
    <div class="container mx-auto flex items-center justify-between py-4">
      <div class="flex items-center">
        <input
          type="text"
          :class="[
            'w-full px-5 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500',
            { 'dark:input': darkMode },
          ]"
          placeholder="Search for a country..."
          v-model="searchTerm"
          @input="filterCountries"
        />
      </div>
      <div class="w-1/2 flex items-center justify-end">
        <select
          class="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          :class="[
            'px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500',
            { 'dark:bg-darkMain': darkMode },
          ]"
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
    <div v-if="isLoading" class="flex justify-center mt-4">
      <div class="loader"></div>
    </div>
  </div>
</template>

<style>
.dark\:bg-darkMain {
  background-color: #202d36;
  color: white;
}

.dark\:input {
  background-color: #2B3743;
  border: 0;
  color: white;
  width: 400px;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>