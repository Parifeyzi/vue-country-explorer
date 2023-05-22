<template>
  <header :class="['header container-wrapper', {'dark:bg-darkHeader': darkMode }]">
    <div class="container mx-auto flex items-center justify-between p-4">
      <h1 class="text-sm sm:text-lg md:text-lg lg:text-lg font-bold">Where in the world?</h1>
      <button class="px-4 py-2 rounded-md" @click="toggleDarkMode">
        <span v-if="darkMode">Light Mode</span>
        <span v-else>Dark Mode</span>
      </button>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const darkMode = ref(false);
    const store = useStore();

    store.watch(() => store.getters.darkMode, (value) => {
      darkMode.value = value;
    });

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      store.commit("TOGGLE_DARK_MODE", darkMode.value);
    };

    return {
      darkMode,
      toggleDarkMode,
    };
  },
};
</script>

<style scoped>
.header {
  background-color: #ffffff;
  color: #000000;
}

.dark\:bg-darkHeader {
  background-color: #2B3743;
  color: #ffffff;
}

.container {
  max-width: 100% !important;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.p-4 {
  padding: 1rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.rounded-md {
  border-radius: 0.375rem;
}

@media (max-width: 640px) {
  .container-wrapper {
    padding: 0 15px !important;
  }
}

@media (min-width: 640px) {
  .text-2xl {
    font-size: 2rem;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }

  .text-2xl {
    font-size: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }

  .text-2xl {
    font-size: 3rem;
  }
}
</style>






