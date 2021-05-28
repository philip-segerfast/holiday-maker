<template>
  <div id="filter-component-main-container">
    <div class="filter-section">
      <div class="header">Luxuries</div>
      <div class="filter-sub-section">
        <div class="luxury-item">
          <span>Pool</span>
        </div>
        <div class="luxury-item">
          <span>Kvällsunderhållning</span>
        </div>
        <div class="luxury-item">
          <span>Barnklubb</span>
        </div>
      </div>
      <div class="header">Selected</div>
      <div class="filter-sub-section">
        <div class="luxury-item">
          <span>Restaurang</span>
        </div>
      </div>
    </div>

    <div class="filter-section">
      <div class="header">Distances</div>

      <div class="filter-sub-section">
        <div class="filter-row">
          <div class="left">To beach</div>
          <div class="right">
            <input
              type="range"
              v-model="beachDistance"
              name="max-distance-center"
              min="0"
              max="100"
              id="max-distance"
            />
            <span>{{ beachDistance }} km</span>
          </div>
        </div>
      </div>

      <div class="filter-sub-section">
        <div class="filter-row">
          <div class="left">To centrum</div>
          <div class="right">
            <input
              type="range"
              v-model="centrumDistance"
              name="max-distance-centrum"
              min="0"
              max="100"
              id="max-distance"
            />
            <span>{{ centrumDistance }} km</span>
          </div>
        </div>
      </div>
    </div>
    <div class="filter-section">
      <div class="header">Budget</div>
      <div class="filter-sub-section">
        <div class="filter-row">
          <div class="left">Order by</div>
          <div class="right">
            <select>
              <option value="cheap">Cheap</option>
              <option value="expensive">Expensive</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      beachDistance: 0,
      centrumDistance: 0,
    };
  },
};
</script>

<style scoped lang="scss">
#filter-component-main-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #2ea4b1;
  height: fit-content;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--box-shadow-outline-smooth);

  .filter-section {
    width: 100%;
    border-radius: inherit;
    background-color: #39c4d3;
    padding-bottom: 5px;
    box-shadow: var(--box-shadow-outline-smooth);
    .header {
      height: fit-content;
      font-size: 1rem;
      background-color: #31bac9;

      &:first-of-type {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
      }
    }

    .filter-sub-section {
      border-radius: inherit;
      display: flex;
      padding: 5px;
      flex-direction: row;
      flex-wrap: wrap;

      .filter-row {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 50px;
        justify-items: center;
        align-items: center;

        .right {
          margin-left: auto;
          display: flex;
          input,
          select {
            width: 150px;
            height: 25px;
          }
          span {
            display: inline-block;
            padding: 0 10px;
            width: 75px;
            text-align: right;
          }
        }
      }

      .luxury-item {
        width: fit-content;
        border-radius: 20px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        margin: 5px;
        background-color: whitesmoke;
        box-shadow: var(--box-shadow-outline-smooth);
        span {
          display: inline-block;
          font-size: 75%;
        }
      }
    }
  }
}
</style>
