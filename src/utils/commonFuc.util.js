import { toast } from 'react-toastify'

const m_names = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]
export const getMonthYear = () => {
  const d = new Date()
  return [m_names[d.getMonth()], d.getFullYear()]
}
export const getnextMonthYear = () => {
  const now = new Date()
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  return [m_names[nextMonth.getMonth()], nextMonth.getFullYear()]
}

export const succssFunc = (res) => {
  toast.success(res.data.message[0].message)
}
