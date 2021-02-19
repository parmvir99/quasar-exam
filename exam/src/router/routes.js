
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'albums', component: () => import('pages/albums.vue') },
      { path: 'album/:id', name: 'albumPhotos', component: () => import('pages/albumPhotos.vue') },
      { path: 'users', name: 'users', component: () => import('pages/users.vue') },
      { path: 'user/album/:id', name: 'userAlbums', component: () => import('pages/userAlbums.vue') },
      { path: 'user/album/images/:id', name: 'userAlbumPhotos', component: () => import('pages/userAlbumPhotos.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
