import { replace, size } from 'lodash'

/*
 * 数字にコンマ付与
 */
export const addCommaForNumber = (num: number): string => num.toLocaleString()

/*
 * 文字数カウント
 */
export const stringCountFormatBy = (contents: string): string => {
  const replaceContents = replace(contents, /<("[^"]*"|'[^']*'|[^'">])*>/g, '')
  const contentsCountResult = size(replaceContents)

  if (contentsCountResult < 100) {
    return `${contentsCountResult}文字`
  }
  return `約${addCommaForNumber(
    Math.round(contentsCountResult / 100) * 100
  )}文字`
}
