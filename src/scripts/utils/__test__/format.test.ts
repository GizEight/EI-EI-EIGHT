import { numberAddComma, stringCountFormatBy } from '../format'
import { largeContent, miniContent } from './sample'

const num = 3500

describe('formatter test', () => {
  it('4桁以上はロケールされる', () => {
    expect(numberAddComma(num)).toBe('3,500')
  })

  it('2桁以下は文字数がそのまま返される', () => {
    expect(stringCountFormatBy(miniContent)).toBe('15文字')
  })

  it('3桁以上は2桁以下を四捨五入した状態かつ４桁以上の場合ロケールされて「約〜文字」の形で返される', () => {
    expect(stringCountFormatBy(largeContent)).toBe('約20,500文字')
  })
})
