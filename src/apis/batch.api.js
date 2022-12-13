import { axiosInstance } from '../config/axios.config'

export const GetBatches = async (susscessfunc) => {
  await axiosInstance.get('api/batch').then((res) => susscessfunc(res))
}
