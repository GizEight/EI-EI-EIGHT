import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, memo } from 'react'
import ReactPaginate from 'react-paginate'

type Props = {
  allCountPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const PagingButtons: FC<Props> = memo(
  ({ currentPage, allCountPage, onPageChange }: Props) => (
    <ReactPaginate
      pageCount={allCountPage}
      nextLabel={<FontAwesomeIcon icon={['fas', 'angles-right']} size="lg" />}
      previousLabel={
        <FontAwesomeIcon icon={['fas', 'angles-left']} size="lg" />
      }
      pageRangeDisplayed={5}
      onPageChange={({ selected }) => onPageChange(selected)}
      forcePage={currentPage}
    />
  )
)
