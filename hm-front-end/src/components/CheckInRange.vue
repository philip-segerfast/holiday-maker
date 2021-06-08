<template>
  <div id="date-range">
    <span style="padding-left: 0">from:</span>
    <input
      class="date-picker"
      type="date"
      name="start"
      v-bind:min="minDate"
      v-model="startDate"
      @input="updateStartDate"
    />
    <span>to:</span>
    <input
      class="date-picker"
      v-bind:min="startDate"
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
      minDate: "",
    };
  },
  mounted() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
    this.startDate = today;
    this.minDate = today;
    this.endDate = today;
  },
  methods: {
    updateStartDate() {
      this.$store.commit("updateStartDate", this.dateStringToUnixSeconds(this.startDate));
    },
    updateEndDate() {
      this.$store.commit("updateEndDate", this.dateStringToUnixSeconds(this.endDate));
    },
    dateStringToUnixSeconds(dateString) {
      return Date.parse(dateString) / 1000;
    },
  },
};
</script>

<style scoped lang="scss">
#date-range {
  box-shadow: var(--box-shadow-navbar-outline-border);
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
  &:hover {
    box-shadow: var(--box-shadow-navbar-outline-smooth);
  }
}
</style>
