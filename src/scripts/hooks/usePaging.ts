import { useState, useCallback } from 'react'

export const usePaging = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const prevPage = useCallback(() => {
    if (currentPage === 1) return
    setCurrentPage((page) => page - 1)
  }, [currentPage, setCurrentPage])

  const nextPage = useCallback(() => {
    // TODO: 最大ページ決まり次第制限処理
    setCurrentPage((page) => page + 1)
  }, [setCurrentPage])

  // ? 表示数(5) => currentPageを基準
  // ? 1,2 & max-1 まで限定条件あり
  // ? 現在ページの前後２ページ表示
  // クリックしたとこの数字のページへ飛ぶ
  // ページングすると数字が可変する
  const jumpPageBy = useCallback(
    (page: number) => {
      setCurrentPage(page)
    },
    [setCurrentPage]
  )

  return { prevPage, nextPage, jumpPageBy }
}
