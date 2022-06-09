import * as dayjs from 'dayjs'

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
  /*
  ? 現在時間 - 作成日時 => 差分（millisecond）
   */
  const calc = dayjs().valueOf() - dayjs(date).valueOf()

  /*
  ? 差分 / 1日millisecond((s * m * h * 1000))
      ? = 1.234(1 => 1日, .234 => 0.234日)
   */
  const diff = calc / (60 * 60 * 24 * 1000)

  // 1日未満
  if (diff < 1) {
    const hour = calc / 1000 / (60 * 60)
    return `${Math.floor(hour)}時間前`
  }

  // 1日以上 => 切り捨て
  return `${Math.floor(diff)}日前`
}
