import { axiosInstance } from '../config/axios.config'

export const LoginApi = async (data, succssFunc) => {
  await axiosInstance
    .post('api/user/login', data)
    .then((res) => succssFunc(res))
}

export const RegisterApi = async (data, succssFunc) => {
  await axiosInstance
    .post('api/user/register', data)
    .then((res) => succssFunc(res))
}

export const HomeApi = () => {
  axiosInstance.get('').then(() => {})
}
