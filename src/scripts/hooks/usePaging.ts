import { useState, useCallback } from 'react'

type Props = {
  allPageCount: number
}

export const usePaging = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1)

  const goBack = useCallback(() => {
    setCurrentPage((old) => Math.max(old - 1, 1))
  }, [currentPage, setCurrentPage])

  const goNext = useCallback(() => {
    if (currentPage === props.allPageCount) return
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

  return { currentPage, goBack, goNext, jumpPageBy }
}
