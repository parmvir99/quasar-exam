<template lang="html">
  <q-page class="q-px-lg q-pt-lg">
      <h4 class="q-mt-none q-mb-md q-pl-sm">User Albums Photos</h4>
      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 q-pa-sm col-12" v-for="(photo, idx) in photos" :key="idx">
          <q-card class="my-card">
            <q-img
              :src='photo.thumbnailUrl'
              basic
            >
              <div class="absolute right-zero transparent q-pa-zero">
               <q-btn round flat icon="more_vert">
                 <q-menu cover auto-close>
                   <q-list>
                     <q-item clickable @click="deleteImage(idx)">
                       <q-item-section >Delete Image</q-item-section>
                     </q-item>
                     <q-item clickable @click="openEditImageModal(photo, idx)">
                       <q-item-section>Edit Image</q-item-section>
                     </q-item>
                   </q-list>
                 </q-menu>
               </q-btn>
             </div>
              <div class="absolute-bottom text-subtitle2 text-left">
                {{ photo.title }}
              </div>
            </q-img>
          </q-card>
        </div>
      </div>
      <q-dialog v-model="editImageModal" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Editing Image</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-caption">Image Title</div>
            <q-input dense v-model="selectedImage.title" autofocus @keyup.enter="prompt = false" />
            <q-uploader
              class="q-mt-md"
              label="Replace Image"
              :factory="tempImageHandler"
              auto-upload
              url="http://localhost:8080/"
              multiple
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Edit Image" @click="editImage()"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="addImageModal" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Add Image</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-caption">Image Title</div>
            <q-input dense v-model="imageTitle" autofocus @keyup.enter="prompt = false" />
            <q-uploader
              class="q-mt-md"
              label="Upload Image"
              :factory="tempImageHandler"
              auto-upload
              url="http://localhost:8080/"
              multiple
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Add Image" @click="addImage()"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="green"  @click="openAddImageModal()"/>
      </q-page-sticky>
  </q-page>
</template>

<script>
import { filter, orderBy } from 'lodash/collection'
export default {
  name: 'albumsPhotos',
  data () {
    return {
      photos: null,
      editImageModal: false,
      addImageModal: false,
      imageTitle: null,
      selectedImage: {
        title: null,
        thumbnailUrl: null,
        url: null
      },
      tempImage: null
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
        const sortedImages = orderBy(filteredPhotos, ['id'], ['desc'])
        this.photos = sortedImages
      } catch (e) {
      }
    },
    deleteImage (idx) {
      this.photos.splice(idx, 1)
    },
    openEditImageModal (photo, idx) {
      this.editImageModal = true
      this.selectedImage = photo
      this.selectedIdx = idx
    },
    tempImageHandler (file) {
      this.tempImage = file[0].__img.src
    },
    editImage () {
      const editedObj = {
        id: this.selectedImage.id,
        title: this.selectedImage.title,
        thumbnailUrl: this.tempImage,
        url: this.tempImage
      }
      this.editImageModal = false
      this.$set(this.photos, this.selectedIdx, editedObj)
    },
    openAddImageModal () {
      this.addImageModal = true
    },
    addImage () {
      const imageObj = {
        id: this.photos.length + 1,
        albumId: this.$route.params.id,
        title: this.imageTitle,
        thumbnailUrl: this.tempImage,
        url: this.tempImage
      }
      this.photos.unshift({ ...imageObj })
      this.addImageModal = false
    }
  }
}
</script>
<style lang="scss" scoped>
.my-card {
  height:250px;
  overflow:hidden;
  .q-img {
    height:250px;
  }
}
</style>
