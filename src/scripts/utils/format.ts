import { size } from 'lodash'

/*
 * 数字にコンマ付与
 */
export const numberAddComma = (num: number): string => num.toLocaleString()

/*
 * 文字数カウント
 */
export const stringCountFormatBy = (contents: string): string =>
  `約${numberAddComma(size(contents))}文字`
