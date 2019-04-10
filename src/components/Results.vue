<template>
  <div class="w-full">
    <!-- If no query typed and no photos or loading then show welcome message -->
    <div v-if="photos.length == 0 && query.length == 0 && !loading">
      <div class="hero flex items-center">
        <div class="text-white text-shadow banner w-full text-center py-10">
          <h1 class="text-bold mb-4">Välkommen till InstaMinds!</h1>
          <p
            class="mb-2 font-semibold"
          >Tjänsten som tar bilder från Flickr och lägger till trevliga effekter!</p>
          <p class="font-semibold">Sök här ovanför efter någon bild du vill göra finare.</p>
        </div>
      </div>
    </div>
    <!-- If no photos but a query but not loading then show error message -->
    <div v-else-if="photos.length == 0 && query.length && !loading">
      <div class="p-12">
        <h1 class="text-3xl text-bold mb-4">Hmm, det fanns visst inga bilder för den sökningen.</h1>
        <p class="text-grey-darkest text-xl">Testa söka efter något annat?</p>
      </div>
    </div>
    <!-- Show pictures from Flickr -->
    <div v-else>
      <div class="p-2">
        <div v-masonry transition-duration="0" item-selector=".item" stagger="0">
          <div v-masonry-tile class="item p-2" v-for="(photo, index) in photos" v-bind:key="index">
            <div class="rounded overflow-hidden border-1 border-grey-light animated fadeIn">
              <img
                class="w-full block cursor-pointer"
                :src="imageUrl(photo)"
                @click="selectPhoto(photo)"
              >
            </div>
          </div>
        </div>
      </div>
      <!-- Show loader if loading -->
      <scaling-squares-spinner
        :animation-duration="1250"
        :size="65"
        color="#ff1d5e"
        v-if="loading"
        class="my-12 mx-auto"
      />
      <!-- If page of pictures is loaded -->
      <div class="w-full block border-t border-grey" v-if="page > 0">
        <!-- Show button to load more if there exists -->
        <button
          v-if="page < pages"
          class="text-xl font-bold text-center mx-auto block mt-8 focus:outline-none"
          @click="search(query)"
        >Ladda fler bilder</button>
        <div class="max-w-xs mx-auto text-center mt-4 mb-12">
          <div class="rounded h-2 bg-grey-light">
            <div class="bg-grey h-2" :style="{'width': (page / pages) + '%'}"></div>
          </div>
          <p class="mt-4 text-grey-darker text-sm">Sida {{page}} av {{pages}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.hero {
  @apply bg-cover bg-center w-full;
  height: calc(100vh - 4rem);
  background-image: url("./../assets/bg2.jpg");
}
.hero h1 {
  font-size: 50px;
}
.hero p {
  font-size: 20px;
}
.hero:after {
  content: "";
  @apply absolute pin-x pin-y;
  background: rgba(0, 0, 0, 0.25);
}
.hero .banner {
  @apply relative z-10;
}
</style>
<script>
var Flickr = require("flickr-sdk");
import { ScalingSquaresSpinner } from "epic-spinners";
export default {
  props: {
    query: {
      type: String,
      required: true,
      default: ""
    }
  },
  data: () => ({
    flickr: new Flickr("f5042da2dee502b8752067f97017c1c7"),
    photos: [],
    page: 1,
    pages: 0,
    loading: false
  }),
  components: {
    ScalingSquaresSpinner
  },
  watch: {
    /**
     * Trigger a new search when query updated
     */
    query(text) {
      this.photos = [];
      this.page = 0;
      if (text.length > 0) this.search(text);
    }
  },
  methods: {
    /**
     * General search method
     */
    search(query) {
      this.loading = true;
      this.flickr.photos
        .search({
          text: query,
          page: this.page + 1,
          per_page: 20
        })
        .then(res => {
          this.photos = this.photos.concat(res.body.photos.photo);
          this.pages = res.body.photos.pages;
          this.page = res.body.photos.page;
          this.loading = false;
        })
        .catch(err => {
          console.error("bonk", err);
          this.loading = false;
        });
    },
    /**
     * Returns the url of the image
     */
    imageUrl(photo) {
      return (
        "https://farm" +
        photo.farm +
        ".staticflickr.com/" +
        photo.server +
        "/" +
        photo.id +
        "_" +
        photo.secret +
        ".jpg"
      );
    },
    /**
     * Method to relay selected photo to parent
     */
    selectPhoto(photo) {
      this.$emit("input", this.imageUrl(photo));
    }
  }
};
</script>