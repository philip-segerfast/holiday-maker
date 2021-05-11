<template>
  <div id="date-range">
    <span style="padding-left: 0">from:</span>
    <input
      class="date-picker"
      type="date"
      name="start"
      v-model="startDate"
      @input="updateStartDate"
    />
    <span>to:</span>
    <input
      class="date-picker"
      type="date"
      name="end"
      v-model="endDate"
      @input="updateEndDate"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    updateStartDate() {
      this.$store.commit("updateStartDate", this.startDate);
    },
    updateEndDate() {
      this.$store.commit("updateEndDate", this.endDate);
    },
  },
};
</script>

<style scoped lang="scss">
#date-range {
  outline: 1px solid var(--component-border-color);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  background-color: var(--component-color);
  padding: 0 18px;
  .date-picker {
    padding: var(--component-input-inner-padding);
    background-color: inherit;
    border: none;
    &:hover {
      background-color: var(--component-color-hover);
      cursor: pointer;
    }
  }
  span {
    padding: var(--component-input-inner-padding) 10px;
  }
}
</style>
