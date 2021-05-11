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
  outline: 1px solid var(--component-border-color);
  border: none;
  border-radius: 20px;
  background-color: var(--component-color);
  padding: 0 18px;
  width: 200px;
  padding: var(--component-input-inner-padding);
  &:hover {
    background-color: var(--component-color-hover);
  }
  &:focus {
    background-color: var(--component-color-active);
  }
}
</style>
