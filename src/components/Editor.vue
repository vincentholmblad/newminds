<template>
  <div class="fixed z-50 pin-y pin-x bg-white overflow-auto animated fadeInUp shadow-outline" v-if="isOpen">
    <!-- Image container -->
    <div class="fixed pin-y pin-x mt-16 mb-24">
      <img :src="imageUrl" ref="image" class="absolute pin-x pin-y object-contain w-full h-full">
    </div>
    <!-- Header with title and close button -->
    <div class="fixed shadow pin-t pin-x h-16 flex items-center px-6 border-b border-grey">
      <h1 class="text-xl font-bold">Lägg till filter</h1>
      <button
        class="absolute pin-r pin-t px-6 h-16 align-middle text-grey-dark focus:outline-none hover:text-grey-darker"
        @click="closeModal"
      >Stäng</button>
    </div>
    <!-- Footer with filters and save button -->
    <div class="filters-wrapper-container fixed shadow pin-b pin-x h-24 border-t border-grey">
      <div class="filters-wrapper" ref="filters">
        <div class="h-24 px-6 flex items-center inline-block flex-wrap">
            <div>
                <h2 class="text-base mb-1">Filter</h2>
                <span class="opacity-50 text-sm">Använd piltangenter eller tryck</span>
            </div>
        </div>
        <button
          class="h-24 align-middle px-6 focus:outline-none capitalize block"
          :class="selectedFilter == index ? 'bg-grey-light active' : 'hover:bg-grey-lighter'"
          v-for="(filter, index) in filters"
          v-bind:key="filter"
          v-html="filter"
          @click="renderFilter(index)"
        ></button>
      </div>
    </div>
    <a
      :href="downloadUrl()"
      class="cursor-pointer no-underline flex items-center justify-center text-lg text-center align-middle focus:outline-none w-48 h-24 bg-green-dark hover:bg-green hover:shadow text-white font-bold absolute pin-r pin-b"
      download="download.jpg"
    >Ladda ned</a>
  </div>
</template>
<style>
.filters-wrapper {
  @apply absolute pin-l pin-b overflow-y-auto whitespace-no-wrap flex flex-no-wrap;
  width: calc(100% - 12rem);
}
.filters-wrapper-container:after {
    content: '';
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
    @apply absolute pin-y w-12 pointer-events-none;
    right: 12rem;
}
.object-contain {
  object-fit: contain;
}
</style>
<script>
require("./../libs/filterous2.min");
import { Promise } from "q";
export default {
  data: () => ({
    imageUrl: null,
    isOpen: false,
    imageObject: null,
    selectedFilter: 0,
    filters: [
      "normal",
      "clarendon",
      "gingham",
      "moon",
      "lark",
      "reyes",
      "juno",
      "slumber",
      "crema",
      "ludwig",
      "aden",
      "perpetua",
      "amaro",
      "mayfair",
      "rise",
      "hudson",
      "valencia",
      "xpro2",
      "sierra",
      "willow",
      "lofi",
      "inkwell",
      "hefe",
      "nashville",
      "stinson",
      "vesper",
      "earlybird",
      "brannan",
      "sutro",
      "toaster",
      "walden",
      "1977",
      "kelvin",
      "maven",
      "ginza",
      "skyline",
      "dogpatch",
      "brooklyn",
      "helena",
      "ashby",
      "charmes"
    ]
  }),
  methods: {
    /**
     * Adds the filter to the image
     */
    async renderFilter(index) {
      this.selectedFilter = index;
      filterous
        .importImage(this.imageObject, {})
        .applyInstaFilter(this.filters[index])
        .renderHtml(this.$refs.image);
      let currentFilterButton = document.querySelectorAll(
        ".filters-wrapper button"
      )[index];
      this.$nextTick(() => {
        if (currentFilterButton) currentFilterButton.scrollIntoView();
      })
    },
    /**
     * Gets the image remotely
     */
    async getImageObject(url) {
      return new Promise(resolve => {
        var image = new Image();
        var canvas = document.createElement("canvas"),
          canvasContext = canvas.getContext("2d");

        image.onload = function() {
          //Set canvas size is same as the picture
          canvas.width = image.width;
          canvas.height = image.height;

          // draw image into canvas element
          canvasContext.drawImage(image, 0, 0, image.width, image.height);

          return resolve(image);
        };
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
      });
    },
    /**
     * Method to open the editor modal
     */
    openModal(imageUrl) {
      this.imageUrl = imageUrl;
      this.isOpen = true;
      this.selectedFilter = 0;
      document.body.classList.add("overflow-hidden");
      window.addEventListener("keydown", this.keyboardListener);
      this.getImageObject(this.imageUrl).then(imageObject => {
        this.imageObject = imageObject;
      });
    },
    /**
     * Method to close the modal
     */
    closeModal() {
      this.imageUrl = null;
      this.isOpen = false;
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", this.keyboardListener);
    },
    /**
     * Listener for keyboard interactions
     */
    keyboardListener(e) {
      // Go left in filters
      if (e.keyCode == "37") {
        if (this.selectedFilter > 0) {
          this.renderFilter(this.selectedFilter - 1);
        }
      }
      // Go right in filters
      if (e.keyCode == "39") {
          console.log(this.selectedFilter + '-' +this.filters.length)
        if (this.selectedFilter + 1 < this.filters.length) {
          this.renderFilter(this.selectedFilter + 1);
        }
      }
      // Close editor
      if (e.keyCode == "27") {
        this.closeModal();
      }
    },
    /**
     * Shorthand method to make image download'able
     */
    downloadUrl() {
      if (!this.$refs.image) return;
      return this.$refs.image.src.replace(
        /^data:image\/[^;]+/,
        "data:application/octet-stream"
      );
    }
  }
};
</script>