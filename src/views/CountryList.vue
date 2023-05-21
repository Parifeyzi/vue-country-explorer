<script>
import { mapActions, mapState } from "vuex";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
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
  computed: {
    ...mapState(["countries"]),
  },
  methods: {
    ...mapActions(["fetchCountries", "toggleDarkMode"]),
  },
  mounted() {
    this.fetchCountries();
    this.toggleDarkMode();
  },
};
</script>

<template>
  <div :class="['container-wrapper', { 'dark:bg-darkMain': darkMode }]">
    <div class="container mx-auto">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 custom-gap"
      >
        <div
          v-for="country in countries"
          :key="country.alpha3Code"
          class="country-items-wrapper"
        >
          <div class="country-items">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dark\:bg-darkMain {
  background-color: #333333;
  color: white;
}

.country-items {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: #ededed 0px 0px 5px 1px;
  height: 400px;
}

.country-items >img{
  height: 180px;
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
  .custom-gap{
    gap: 3.5rem;
  }
}
</style>