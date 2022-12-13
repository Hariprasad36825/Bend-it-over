import axios from 'axios'

const baseUrl = 'https://bend-it-over.onrender.com/'

export const axiosInstance = axios.create({
  baseURL: baseUrl
})

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('AccessToken')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
