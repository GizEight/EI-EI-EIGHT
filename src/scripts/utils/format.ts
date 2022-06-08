import dayjs from 'dayjs'

/*
 * FORMAT
 */
const NOW_FORMAT = 'YYYY/MM/DD HH:mm:ss'
const DAY_FORMAT = 'YYYY/MM/DD'

/*
 * NOW
 */
export const nowDate = () => dayjs().format(NOW_FORMAT)

/*
 * Date Formatter
 */
export const formatDate = (date: string) => dayjs(date).format(DAY_FORMAT)
