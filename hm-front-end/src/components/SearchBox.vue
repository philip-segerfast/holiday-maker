<template>
  <!-- eslint-disable-next-line -->
  <input
    type="text"
    id="search"
    placeholder="Where do you want to travel?"
    @input="updateSearchText"
  />
</template>

<script>
export default {
  methods: {
    updateSearchText(e) {
      this.$store.commit("updateSearchText", e.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
#search {
  border: none;
  outline: none;
  border-radius: 20px;
  box-shadow: var(--box-shadow-navbar-outline-border);
  background-color: var(--component-color);
  width: 200px;
  margin-bottom: 0;
  &:hover {
    background-color: var(--component-color-hover);
    box-shadow: var(--box-shadow-navbar-outline-smooth);
  }
  &:focus {
    background-color: var(--component-color-active);
    box-shadow: var(--box-shadow-navbar-outline-hard);
  }
}
</style>
