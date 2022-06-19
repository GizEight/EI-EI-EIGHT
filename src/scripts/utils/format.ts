import { size } from 'lodash'

/*
 * 数字にコンマ付与
 */
export const addCommaForNumber = (num: number): string => num.toLocaleString()

/*
 * 文字数カウント
 */
export const stringCountFormatBy = (contents: string): string => {
  const contentsCountResult = size(contents)

  if (contentsCountResult < 100) {
    return `${size(contents)}文字`
  }
  return `約${addCommaForNumber(Math.round(size(contents) / 100) * 100)}文字`
}
