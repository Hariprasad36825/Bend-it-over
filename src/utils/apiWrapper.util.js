import { toast } from 'react-toastify'
export const ApiWrapper = async (func, ...args) => {
  try {
    await func(...args)
  } catch (error) {
    // const status = error?.response?.status
    const message = error?.response?.data?.message[0].message
    toast.error(message)
  }
}
