<template>
    <Header />
    <FilterCountries />
    <CountryList />
</template>

<script>
import Header from './components/Header.vue';
import FilterCountries from './views/FilterCountries.vue';
import CountryList from './views/CountryList.vue';

export default {
  components: {
    Header,
    FilterCountries,
    CountryList,
  },
};
</script>

<style>
</style>