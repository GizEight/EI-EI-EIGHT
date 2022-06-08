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

/*
 * ~日前 ~時間前
 */
export const calculateDate = (date: string) => {
  const calc = dayjs().valueOf() - dayjs(date).valueOf()

  // 日単位の差分
  const diff = calc / (60 * 60 * 24 * 1000)

  // 1日未満
  if (diff < 1) {
    return `${Math.ceil(calc / 1000000)}時間前`
  }

  // 1日以上
  return `${Math.floor(diff)}日前`
}
