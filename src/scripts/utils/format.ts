import dayjs from 'dayjs'

const NOW_FORMAT = 'YYYY/MM/DD HH:mm:ss'
const DAY_FORMAT = 'YYYY/MM/DD'

export const nowDate = () => dayjs().format(NOW_FORMAT)

export const formatDate = (date: string) => dayjs(date).format(DAY_FORMAT)
