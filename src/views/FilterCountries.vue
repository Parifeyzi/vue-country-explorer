<template>
  <div class="container-wrapper py-4" :class="{'dark:bg-darkMain': darkMode}">
    <div class="container mx-auto flex flex-col sm:flex-row items-center justify-between py-4">
      <div class="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
        <input
          type="text"
          :class="[
            'w-full sm:w-auto px-5 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500',
            {'dark:input': darkMode}
          ]"
          placeholder="Search for a country..."
          v-model="searchTerm"
          @input="filterCountries"
        />
      </div>
      <div class="w-full sm:w-auto flex items-center justify-end">
        <select
          class="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          :class="{'dark:bg-darkMain': darkMode}"
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
      isLoading,
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

<style>
.dark\:bg-darkMain {
  background-color: #202d36;
  color: white;
}

.dark\:input {
  background-color: #2b3743;
  border: 0;
  color: white;
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

@media (max-width: 640px) {
  .container-wrapper {
    padding: 0 50px !important;
  }

  .w-full {
    width: 100% !important;
  }
}
</style>