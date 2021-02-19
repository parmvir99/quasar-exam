<template lang="html">
  <q-page class="q-px-lg q-pt-lg">
      <h4 class="q-mt-none q-mb-md q-pl-sm">All Photos</h4>
      <div class="row d-flex">
        <div class="col-lg-3 col-md-4 col-sm-6 q-pa-sm col-12" v-for="(photo, idx) in photos" :key="idx">
          <q-card class="my-card">
            <q-img
              :src='photo.thumbnailUrl'
              basic
            >
              <div class="absolute-bottom text-subtitle2 text-left">
                {{ photo.title }}
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
  </q-page>
</template>

<script>
import { filter } from 'lodash/collection'
export default {
  name: 'albumsPhotos',
  data () {
    return {
      photos: null
    }
  },
  mounted () {
    this.getAlbumPhotos()
  },
  methods: {
    async getAlbumPhotos () {
      try {
        const photos = await this.$axios.get('https://jsonplaceholder.typicode.com/photos/')
        // Had to use lodash filters to filter the images by album id
        const filteredPhotos = filter(photos.data, { albumId: parseInt(this.$route.params.id) })
        this.photos = filteredPhotos
      } catch (e) {
      }
    }
  }
}
</script>

<style lang="scss">
</style>
