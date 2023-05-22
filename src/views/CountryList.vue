<script>
import { mapState, mapActions } from "vuex";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import FilterCountries from "../views/FilterCountries.vue";

export default {
  components: {
    FilterCountries,
  },
  setup() {
    const darkMode = ref(false);
    const store = useStore();

    const toggleDarkMode = (value) => {
      darkMode.value = value;
    };

    onMounted(async () => {
      await store.dispatch("fetchCountries");
      toggleDarkMode(store.getters.darkMode);
      store.dispatch("toggleDarkMode");
    });

    store.watch(
      () => store.getters.darkMode,
      (value) => {
        toggleDarkMode(value);
      }
    );

    return {
      darkMode,
    };
  },
  computed: {
    ...mapState(["countries"]),
  },
  methods: {
    ...mapActions(["fetchCountries"]),
  },
};
</script>

<template>
  <FilterCountries />
  <div :class="['container-wrapper', 'h-screen', { 'dark:bg-darkMain': darkMode }]">
    <div class="container mx-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 custom-gap"
      >
        <div
          v-for="country in countries"
          :key="country.alpha3Code"
          class="country-items-wrapper"
        >
          <div :class="['country-items', { 'dark:country-items': darkMode }]">
            <router-link :to="`/country/${country.name.common}`">
              <img :src="country.flags.png" :alt="country.flags.alt" />
              <div class="country-name">{{ country.name.common }}</div>
              <div class="countries-list-detail">
                <div class="countries-list-detail-title">Population:</div>
                {{ country.population }}
                <br />
                <div class="countries-list-detail-title">Region:</div>
                {{ country.region }}
                <br />
                <div class="countries-list-detail-title">Capital:</div>
                {{ country.capital[0] }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dark\:bg-darkMain {
  background-color: #202d36;
  color: white;
}

.dark\:country-items {
  background-color: #2b3743 !important;
  color: white !important;
  box-shadow: #2f2f2f 0px 0px 5px 1px !important;
}

.country-items {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: #ededed 0px 0px 5px 1px;
  height: 400px;
}

.country-items > a > img {
  height: 180px;
  width: 100%;
  border-radius: 8px 8px 0 0;
}

.country-name {
  font-weight: bold;
  margin-top: 1rem;
}

.countries-list-detail {
  margin-top: 0.5rem;
}

.countries-list-detail-title {
  font-weight: bold;
  margin-bottom: 0.2rem;
}

@media (max-width: 640px) {
  .container-wrapper {
    padding: 0 50px !important;
  }
}

@media (min-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .grid-cols-1 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-1 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .custom-gap {
    gap: 3.5rem;
  }
}
</style>