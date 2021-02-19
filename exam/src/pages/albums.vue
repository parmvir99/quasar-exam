<template lang="html">
  <q-page class="q-px-lg q-pt-lg">
      <h4 class="q-mt-none q-mb-md q-pl-sm">All albums</h4>
      <div class="row">
        <div class="col-lg-3 col-sm-4 q-pa-sm col-12" v-for="album in albums" :key="album.id">
          <q-card class="my-card">
           <q-card-section class="bg-grey-8 text-white">
             <div class="text-10">{{ album.title }}</div>
           </q-card-section>
             <q-list>
              <q-item clickable @click="viewPhotos(album.id)">
                <q-item-section avatar>
                  <q-icon color="primary" name="style" label="" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>View Album</q-item-label>
                  <q-item-label caption>It's Awesome!</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
         </q-card>
        </div>
      </div>
  </q-page>
</template>

<script>
export default {
  name: 'Albums',
  data () {
    return {
      albums: null
    }
  },
  mounted () {
    this.getAlbums()
  },
  methods: {
    async getAlbums () {
      try {
        const albums = await this.$axios.get(' https://jsonplaceholder.typicode.com/albums')
        this.albums = albums.data
      } catch (e) {
      }
    },
    viewPhotos (albumId) {
      this.$router.push({ name: 'albumPhotos', params: { id: albumId } })
    }
  }
}
</script>

<style lang="scss">
</style>
