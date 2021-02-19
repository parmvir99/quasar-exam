<template lang="html">
  <q-page class="q-px-lg q-pt-lg">
      <h4 class="q-mt-none q-mb-md q-pl-sm">User list</h4>
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-3 q-pa-sm col-12" v-for="user in users" :key="user.id">
          <q-card class="my-card" flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ user.name }}</q-item-label>
                <q-item-label caption>
                  {{ user.phone }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />
            <q-card-section>
              <q-card-section>
                <q-item-label class="text-caption text-grey-13 text-weight-light">User Name</q-item-label>
                <q-item-label>{{ user.username }}</q-item-label>
                <q-item-label class="text-caption text-grey-13 text-weight-light">Email</q-item-label>
                <q-item-label>{{ user.email }}</q-item-label>
                <q-item-label class="text-caption text-grey-13 q-pt-sm">Company Name</q-item-label>
                <q-item-label>{{ user.company.name }}</q-item-label>
                <q-item-label class="text-caption text-grey-13 q-pt-sm">Address</q-item-label>
                <q-item-label>{{ user.address.suite }}, {{ user.address.street }}, {{ user.address.city }}</q-item-label>
              </q-card-section>
              <q-list>
               <q-item clickable @click="viewAlbums(user.id)">
                 <q-item-section avatar>
                   <q-icon color="primary" name="person" label="" />
                 </q-item-section>
                 <q-item-section>
                   <q-item-label>View User</q-item-label>
                   <q-item-label caption>Content inside!</q-item-label>
                 </q-item-section>
               </q-item>
             </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
  </q-page>
</template>

<script>
export default {
  name: 'Users',
  data () {
    return {
      users: null
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      try {
        const users = await this.$axios.get(' https://jsonplaceholder.typicode.com/users')
        this.users = users.data
      } catch (e) {
      }
    },
    viewAlbums (userId) {
      this.$router.push({ name: 'userAlbums', params: { id: userId } })
    }
  }
}
</script>

<style lang="scss">
</style>
