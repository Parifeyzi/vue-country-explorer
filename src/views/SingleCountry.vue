<script>
import { mapActions } from "vuex";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const country = ref(null);
    const darkMode = ref(false);
    const store = useStore();

    store.watch(
      () => store.getters.darkMode,
      (value) => {
        darkMode.value = value;
      }
    );

    onMounted(async () => {
      const countryName = route.params.countryName;
      const response = await fetchCountryDetails(countryName);
      country.value = response[0];
      toggleDarkMode();
    });

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      store.commit("TOGGLE_DARK_MODE", darkMode.value);
    };

    return {
      country,
      darkMode,
      toggleDarkMode,
    };
  },

  methods: {
    ...mapActions(["toggleDarkMode"]),
  },

  mounted() {
    this.toggleDarkMode();
  },
};

async function fetchCountryDetails(countryName) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  const data = await response.json();
  return data;
}
</script>

<template>
<div :class="['container-wrapper', 'h-screen', { 'dark:bg-darkMain': darkMode }]">
    <div class="container mx-auto">
      <router-link
        to="/"
        :class="['btn-back my-10', { 'dark:btn-back-dark': darkMode }]"
        >Back</router-link
      >
      <div v-if="country">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/2 pt-5 pb-5 pr-5">
            <img
              class="country-img"
              :src="country.flags.png"
              :alt="country.flags.alt"
            />
          </div>
          <div class="md:w-1/2 mt-10">
            <h2 class="text-xl font-bold mb-4">{{ country.name.common }}</h2>
            <div class="flex flex-col md:flex-row">
              <div class="w-full md:w-1/2 mb-4 md:mb-0">
                <div class="mb-2">
                  <span class="font-semibold">Native Name:</span>
                  <div class="font-gray ml-2">
                    {{ Object.values(country.name.nativeName)[0].common }}
                  </div>
                </div>
                <div class="mb-2">
                  <span class="font-semibold">Population:</span>
                  <div class="font-gray ml-2">{{ country.population }}</div>
                </div>
                <div class="mb-2">
                  <span class="font-semibold">Region:</span>
                  <div class="font-gray ml-2">{{ country.region }}</div>
                </div>
                <div class="mb-2">
                  <span class="font-semibold">Sub Region:</span>
                  <div class="font-gray ml-2">{{ country.subregion }}</div>
                </div>
                <div class="mb-2">
                  <span class="font-semibold">Capital:</span>
                  <div class="font-gray ml-2">{{ country.capital[0] }}</div>
                </div>
              </div>
              <div class="w-full md:w-1/2">
                <div class="mb-2">
                  <span class="font-semibold">Top Level Domain:</span>
                  <div class="font-gray ml-2">{{ country.tld[0] }}</div>
                </div>
                <div class="mb-2">
                  <span class="font-semibold">Countries:</span>
                  <div class="font-gray ml-2">
                    {{ Object.values(country.currencies)[0].name }}
                  </div>
                </div>
                <div class="mb-2">
                  <span class="font-semibold">Languages:</span>
                  <div
                    class="font-gray ml-2"
                    v-for="langs in country.languages"
                    :key="langs"
                  >
                    {{ langs }},
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <span class="font-semibold">Borders Countries:</span>
              <div
                v-for="borderCountry in country.borders"
                :key="borderCountry"
                class="font-gray ml-2 border-ctr"
              >
                {{ borderCountry }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex justify-center mt-4">
          <div class="loader"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dark\:btn-back-dark {
  background-color: #2b3743 !important;
  color: white !important;
  box-shadow: #2f2f2f 0px 0px 5px 1px !important;
}

.btn-back {
  padding: 0.4rem 3rem;
  background-color: white;
  color: black;
  text-decoration: none;
  border-radius: 0.25rem;
  display: inline-block;
  box-shadow: #dcdbdb 0px 0px 7px 3px;
}

.country-img {
  width: 500px;
  height: 350px;
}

.font-gray {
  color: rgb(129, 129, 129);
  display: inline-block;
}

.border-ctr {
  box-shadow: #dcdbdb 0px 0px 3px 1px;
  padding: 2px 30px 4px;
  border-radius: 3px;
  font-size: 12px;
  margin: 5px;
}

@media (max-width: 767px) {
  .country-img {
    width: 100%;
    height: 250px;
  }

  .btn-back {
    width: fit-content;
    margin: 40px auto;
  }

  .flex-col.md\:flex-row {
    flex-direction: column;
  }
}
</style>