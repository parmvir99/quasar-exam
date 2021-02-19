import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const api = axios.create({ baseURL: ' https://jsonplaceholder.typicode.com' })

Vue.prototype.$api = api

export { axios, api }
