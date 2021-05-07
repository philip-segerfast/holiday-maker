<template>
  <div class="home">
    <SearchBar />
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";

export default {
  name: "Home",
  components: { SearchBar },
  methods: {
    search() {
      console.log();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
