<template>
  <div id="container">
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
      <input class="date-picker" type="date" name="end" v-model="endDate" @input="updateEndDate" />
    </div>
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
#container {
  #date-range {
    display: flex;
    flex-direction: row;

    span {
      padding: 0 10px;
    }
  }
}
</style>
