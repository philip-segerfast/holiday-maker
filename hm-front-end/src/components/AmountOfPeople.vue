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
        <input
          type="number"
          name="adults-amt"
          min="0"
          v-model="adultsAmount"
          @input="updateAdultsAmount"
        />
      </div>
      <div class="dropdown-info">
        <span>Children</span>
        <!-- eslint-disable-next-line -->
        <input
          type="number"
          name="children-amt"
          min="0"
          max="10"
          v-model="childrenAmount"
          @input="updateChildren"
        />
      </div>
      <!-- CHILDREN AGES -->
      <div v-for="(child, index) in getSelectedChildren" :key="index" class="child-age">
        <span>child {{ child.id + 1 }}</span>
        <div class="right">
          <span>age: </span>
          <input
            type="number"
            name="child-age"
            v-model="children[index].age"
            @input="updateChild(child, index)"
            min="0"
            max="17"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDropdownHidden: true,
      adultsAmount: 2,
      childrenAmount: 0,
      children: [],
      childrenAges: [],
    };
  },
  computed: {
    getChildrenAmount() {
      return parseInt(this.childrenAmount);
    },
    getSelectedChildren() {
      return this.children.filter((child) => {
        if (child.id + 1 <= this.childrenAmount) return true;
        else return false;
      });
    },
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
    updateChildren() {
      let childrenAmount = this.childrenAmount;
      let children = this.children;
      if (children.length < childrenAmount) {
        children.push({ id: childrenAmount - 1, age: 0 });
      }
      this.storeChildren();
    },
    updateChild(child, index) {
      child.id = index;
      this.storeChildren();
    },
    storeChildren() {
      this.$store.commit("updateChildren", this.getSelectedChildren);
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
  border-bottom: none;
}

#container {
  display: block;
  width: 200px;
  #info-box {
    padding: var(--component-input-inner-padding);
    background-color: var(--component-color);
    border-radius: var(--component-border-radius);
    box-shadow: var(--box-shadow-navbar-outline-border);
    &:hover {
      cursor: pointer;
      background-color: var(--component-color-hover);
      box-shadow: var(--box-shadow-navbar-outline-hard);
    }
    &:active {
      background-color: var(--component-color-active);
    }
  }
  #dropdown {
    position: absolute;
    width: inherit;
    height: fit-content;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: var(--box-shadow-navbar-outline-border);
    .dropdown-info {
      display: flex;
      height: fit-content;
      align-items: left;
      justify-content: left;
      padding: 10px;
      input {
        padding-left: auto;
        height: min-content;
        width: 40px;
        margin-left: auto;
        text-align: center;
      }
    }
    .child-age {
      display: flex;
      padding: 5px 10px;
      span {
        padding-right: 10px;
        margin-right: auto;
      }
      .right {
        span {
          padding: 0;
          margin: 0;
        }
        input {
          width: 40px;
        }
      }
    }
    &:hover {
      cursor: pointer;
      box-shadow: var(--box-shadow-navbar-outline-hard);
    }

    // style all children of dropdown
    > * {
      background-color: var(--component-color);
      &:hover {
        background-color: var(--component-color-hover);
      }
      &:last-child {
        border-bottom-left-radius: inherit;
        border-bottom-right-radius: inherit;
      }
    }
  }
}
</style>
