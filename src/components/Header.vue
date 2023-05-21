<template>
  <header id="header">
    <div class="container mx-auto flex items-center justify-between p-4">
      <h1 class="text-2xl font-bold">Where in the world?</h1>
      <button class="px-4 py-2 rounded-md" @click="toggleDarkMode">
        <span v-if="darkMode">
          Light Mode
        </span>
        <span v-else>
          Dark Mode
        </span>
      </button>
    </div>
  </header>
</template>
  
  <script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["darkMode"]),
  },
  methods: {
    ...mapMutations(["toggleDarkMode"]),
  },
};
</script>
  
  <style>
</style>