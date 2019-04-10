<template>
  <div id="app" class="pt-16">
    <!-- Header -->
    <div class="fixed z-50 pin-t pin-x h-16 flex items-center bg-white border-b border-grey shadow">
      <span class="text-xl font-bold mx-4 whitespace-no-wrap">
        <svg class="w-6 h-6 mr-1 -mt-1 inline align-middle" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magic" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160zm352 128l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zm70.62-193.77L417.77 9.38C411.53 3.12 403.34 0 395.15 0c-8.19 0-16.38 3.12-22.63 9.38L9.38 372.52c-12.5 12.5-12.5 32.76 0 45.25l84.85 84.85c6.25 6.25 14.44 9.37 22.62 9.37 8.19 0 16.38-3.12 22.63-9.37l363.14-363.15c12.5-12.48 12.5-32.75 0-45.24zM359.45 203.46l-50.91-50.91 86.6-86.6 50.91 50.91-86.6 86.6z"/></svg>
        InstaMinds
      </span>
      <search v-model="search" />
    </div>
    <!-- Scrollable content -->
    <results :query="search" v-model="selectedImage" />
    <!-- Editor Modal-->
    <editor ref="editor" />
  </div>
</template>

<script>
import Search from './components/Search.vue'
import Results from './components/Results.vue'
import Editor from './components/Editor.vue'
export default {
  title: 'InstaMind — Flickr som Instagram',
  name: 'app',
  components: {
    Search,
    Results,
    Editor
  },
  data: () => ({
    search: '',
    selectedImage: null
  }),
  watch: {
    /**
     * Takes the selected image and opens the editor
     */
    selectedImage(image) {
      if(image) {
        this.$refs.editor.openModal(image);
        this.selectedImage = null;
      }
    }
  }
}
</script>