import { calculateDate } from '../dateFormat'

/*
!結果はその日に応じて適宜変更する必要あり
 */

describe('dateFormatter test', () => {
  it('現在時刻から計算して1日以上前なら〜日前、未満なら〜時間前が返される', () => {
    expect(calculateDate('2022-06-08T01:40:04.408Z')).toBe('23時間前')
  })
  it('現在時刻から計算して1日以上前なら〜日前が返される', () => {
    expect(calculateDate('2022-06-03T08:08:18.318Z')).toBe('6日前')
  })
})
