<template>
  <input
    type="search"
    v-model="search"
    class="text-lg w-full focus:outline-none h-full border-l border-grey-light px-4"
    placeholder="Sök efter bilder från Flickr här..."
    ref="input"
  >
</template>
<script>
const _ = require("lodash");
export default {
  data: () => ({
    search: ""
  }),
  mounted() {
      // Set focus to searchfield when page is loaded
      this.$refs.input.focus();
  },
  watch: {
    /**
     * Throttle the search to 250ms to not overflow the API while typing
     */
    search: _.debounce(function(text) {
      this.$emit("input", text)
    }, 250)
  }
};
</script>

