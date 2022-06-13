import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, memo } from 'react'
import { useForm } from 'react-hook-form'

import { ErrorMessage } from '../atoms/ErrorMessage'

type Input = {
  searchInput: string
}

export const SearchInput: FC = memo(() => {
  const {
    register,
    formState: { errors },
  } = useForm<Input>()

  return (
    <>
      {errors.searchInput && (
        <ErrorMessage
          message={
            errors.searchInput.message || '正しい形式で入力してください。'
          }
        />
      )}
      <label className="c-form search-label" htmlFor="search">
        <input
          className="c-form-search"
          {...register('searchInput', { maxLength: 256 })}
        />
        <FontAwesomeIcon
          size="lg"
          icon={['fas', 'magnifying-glass']}
          className="c-form-search-icon"
        />
      </label>
    </>
  )
})
