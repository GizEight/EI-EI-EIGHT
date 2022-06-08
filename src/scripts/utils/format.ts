import dayjs from 'dayjs'

const DAY_FORMAT = 'YYYY/MM/DD'

export const formatDate = (date: string) => dayjs(date).format(DAY_FORMAT)
