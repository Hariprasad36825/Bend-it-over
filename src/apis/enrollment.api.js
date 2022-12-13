import { axiosInstance } from '../config/axios.config'

export const GetEnrollmentApi = async (month, year, succssFunc) => {
  await axiosInstance
    .get(`api/enrollments/${month}/${year}`)
    .then((res) => succssFunc(res))
}

export const ModifyEnrollmentApi = async (data, succssFunc) => {
  await axiosInstance
    .put(`api/enrollments`, data)
    .then((res) => succssFunc(res))
}

export const addEnrollmentApi = async (data, susscessfunc) => {
  await axiosInstance
    .post('api/enrollments', data)
    .then((res) => susscessfunc(res))
}
