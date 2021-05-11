<!-- NEED TO ADD AGES FOR CHILDREN -->
<template>
  <div id="container" class="unselectable" v-click-away="onClickAway">
    <!-- eslint-disable-next-line -->
    <div v-bind:class="{ open: !isDropdownHidden }" id="info-box" v-on:click="toggleShowDropdown">
      <span id="adults">Adults: {{ adultsAmount }}</span>
      &nbsp;&middot;&nbsp;
      <span id="children">Children: {{ childrenAmount }}</span>
    </div>

    <!-- eslint-disable-next-line -->
    <div v-bind:class="{ hidden: isDropdownHidden }" id="dropdown">
      <div class="dropdown-info">
        <span>Adults</span>
        <!-- eslint-disable-next-line -->
        <input type="number" name="adults-amt" min="0" v-model="adultsAmount" @input="updateAdultsAmount" />
      </div>
      <div class="dropdown-info">
        <span>Children</span>
        <!-- eslint-disable-next-line -->
        <input type="number" name="children-amt" min="0" v-model="childrenAmount" @input="updateChildrenAmount" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDropdownHidden: true,
      childrenAmount: 0,
      adultsAmount: 0,
    };
  },
  methods: {
    toggleShowDropdown() {
      this.isDropdownHidden = !this.isDropdownHidden;
    },
    onClickAway() {
      // Hide drop-down if it's not already hidden.
      if (!this.isDropdownHidden) {
        this.toggleShowDropdown();
      }
    },
    updateAdultsAmount() {
      this.$store.commit("updateAdultsAmount", this.adultsAmount);
    },
    updateChildrenAmount() {
      this.$store.commit("updateChildrenAmount", this.childrenAmount);
    },
  },
};
</script>

<style scoped lang="scss">
.hidden {
  display: none;
}

.open {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

#container {
  display: block;
  height: 100%;
  width: 200px;
  #info-box {
    padding: 10px;
    background-color: rgb(119, 233, 179);
    border-radius: 10px;
    outline: black solid 1px;
    &:hover {
      cursor: pointer;
      background-color: rgb(106, 207, 160);
    }
  }
  #dropdown {
    position: absolute;
    width: inherit;
    height: fit-content;
    outline: black solid 1px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .dropdown-info {
      display: flex;
      height: fit-content;
      align-items: left;
      justify-content: left;
      padding: 10px;
      background-color: rgb(119, 233, 179);
      input {
        padding-left: auto;
        height: min-content;
        width: 40px;
        margin-left: auto;
        text-align: center;
      }
    }
    .dropdown-info:last-child {
      border-radius: inherit;
    }
  }
}
</style>
