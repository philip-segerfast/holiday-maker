<template>
  <div class="home">
    <div>
      <SearchBar/>
      <!-- Hello -->
      <div>Hello</div>
    </div>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";


export default {
  name: "Home",
  components: { SearchBar,
  },
};
</script>