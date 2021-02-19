<template lang="html">
  <q-page class="q-px-lg q-pt-lg">
      <h4 class="q-mt-none q-mb-md q-pl-sm">User Albums</h4>
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 q-pa-sm col-12" v-for="(album, idx) in userAlbums" :key="album.id">
          <q-card class="my-card">
           <q-card-section class="bg-grey-8 text-white q-pa-none">
             <div class="absolute right-zero">
              <q-btn round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list left>
                    <q-item clickable @click="deleteAlbum(idx)">
                      <q-item-section >Delete Album</q-item-section>
                    </q-item>
                    <q-item clickable @click="openEditAlbumModal(album, idx)">
                      <q-item-section>Edit album</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
             <div class="text-subtitle2 q-pa-md q-mr-lg">{{ album.title }}</div>
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
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="green"  @click="openAddAlbumModal()"/>
      </q-page-sticky>
      <q-dialog v-model="albumModal" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Album Name</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="albumName" autofocus @keyup.enter="prompt = false" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Add Album" @click="addAlbum()"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="editAlbumModal" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Editing album</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-caption">Album Name</div>
            <q-input dense v-model="selectedAlbum.title" autofocus @keyup.enter="prompt = false" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Edit Album" @click="editAlbum()"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
import { filter, orderBy } from 'lodash/collection'
export default {
  name: 'Albums',
  data () {
    return {
      userAlbums: null,
      albumModal: false,
      editAlbumModal: false,
      albumName: null,
      selectedIdx: null,
      selectedAlbum: {}
    }
  },
  mounted () {
    this.getAlbums()
  },
  methods: {
    async getAlbums () {
      try {
        const userAlbums = await this.$axios.get('https://jsonplaceholder.typicode.com/albums')
        const filteredAlbums = filter(userAlbums.data, { userId: parseInt(this.$route.params.id) })
        const sortedAlbums = orderBy(filteredAlbums, ['id'], ['desc'])
        this.userAlbums = sortedAlbums
      } catch (e) {
      }
    },
    viewPhotos (albumId) {
      this.$router.push({ name: 'userAlbumPhotos', params: { id: albumId } })
    },
    deleteAlbum (idx) {
      this.userAlbums.splice(idx, 1)
    },
    openAddAlbumModal () {
      this.albumModal = true
    },
    addAlbum () {
      const albumObj = {
        id: this.userAlbums.length + 1,
        title: this.albumName,
        userId: this.userAlbums.[0].userId
      }
      this.userAlbums.unshift({ ...albumObj })
      this.albumModal = false
    },
    openEditAlbumModal (album, idx) {
      this.editAlbumModal = true
      this.selectedAlbum = album
      this.selectedIdx = idx
    },
    editAlbum () {
      const editedObj = {
        id: this.selectedAlbum.id,
        title: this.selectedAlbum.title,
        userId: this.selectedAlbum.userId
      }
      this.editAlbumModal = false
      this.$set(this.userAlbums, this.selectedIdx, editedObj)
    }
  }
}
</script>

<style lang="scss">
</style>
