import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { FC, memo, useCallback } from 'react'

type Props = {
  allCountPage: number
  currentPage: number
  next: () => void
  prev: () => void
  jump: (page: number) => void
}

export const PagingButtons: FC<Props> = memo(
  ({ currentPage, allCountPage, next, prev, jump }: Props) => {
    const pageByBtnOrder = useCallback(
      (order: number): number => {
        switch (order) {
          case 1:
            return currentPage === 1 || currentPage === 2 ? 1 : currentPage - 2
          case 2:
            return currentPage === 1 || currentPage === 2 ? 2 : currentPage - 1
          case 3:
            return currentPage === 1 || currentPage === 2 ? 3 : currentPage
          case 4:
            return currentPage === allCountPage
              ? allCountPage - 1
              : currentPage + 1
          case 5:
            return currentPage === allCountPage ? allCountPage : currentPage + 2
          default:
            return 1
        }
      },
      [currentPage, allCountPage]
    )

    return (
      <div className="p-paging">
        <button
          className="p-paging_btn"
          onClick={prev}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={['fas', 'angles-left']} size="lg" />
        </button>
        <button
          onClick={() => jump(pageByBtnOrder(1))}
          className={clsx(
            'p-paging_btn',
            currentPage === pageByBtnOrder(1) && 'p-paging_btn-current'
          )}
        >
          {pageByBtnOrder(1)}
        </button>
        {allCountPage >= 2 && (
          <button
            onClick={() => jump(pageByBtnOrder(2))}
            className={clsx(
              'p-paging_btn',
              currentPage === pageByBtnOrder(2) && 'p-paging_btn-current'
            )}
          >
            {pageByBtnOrder(2)}
          </button>
        )}
        {allCountPage >= 3 && (
          <button
            onClick={() => jump(pageByBtnOrder(3))}
            className={clsx(
              'p-paging_btn',
              currentPage === pageByBtnOrder(3) && 'p-paging_btn-current'
            )}
          >
            {pageByBtnOrder(3)}
          </button>
        )}
        {allCountPage >= 4 && (
          <button
            onClick={() => jump(pageByBtnOrder(4))}
            className={clsx(
              'p-paging_btn',
              currentPage === pageByBtnOrder(4) && 'p-paging_btn-current'
            )}
          >
            {allCountPage === 4 ? 4 : pageByBtnOrder(4)}
          </button>
        )}
        {allCountPage >= 5 && (
          <button
            onClick={() => jump(pageByBtnOrder(5))}
            className={clsx(
              'p-paging_btn',
              currentPage === pageByBtnOrder(5) && 'p-paging_btn-current'
            )}
          >
            {allCountPage === 5 ? 5 : pageByBtnOrder(5)}
          </button>
        )}
        <button
          className={clsx('p-paging_btn')}
          onClick={next}
          disabled={currentPage === allCountPage}
        >
          <FontAwesomeIcon icon={['fas', 'angles-right']} size="lg" />
        </button>
      </div>
    )
  }
)
