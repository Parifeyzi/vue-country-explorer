<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-4 gap-6">
      <div
        v-for="country in countries"
        :key="country.alpha3Code"
        class="country-items-wrapper"
      >
        <div class="country-items" :key="country.name.common">
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
            {{ country.capital }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { onMounted } from "vue";
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["countries"]),
  },
  methods: {
    ...mapActions(["fetchCountries"]),
  },
  mounted() {
    this.fetchCountries();
  },
};
</script>
  
  <style>
/* Add any custom styles here */
</style>