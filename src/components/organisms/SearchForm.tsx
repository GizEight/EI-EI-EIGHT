import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, memo } from 'react'
import { useForm } from 'react-hook-form'

import { ErrorMessage } from '../atoms/ErrorMessage'

type Input = {
  searchInput: string
}

export const SearchForm: FC = memo(() => {
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
      <form className="c-form search-label">
        <input
          className="c-form-search"
          {...register('searchInput', { maxLength: 256 })}
        />
        <button type="submit" className="c-form-search-icon">
          <FontAwesomeIcon size="lg" icon={['fas', 'magnifying-glass']} />
        </button>
      </form>
    </>
  )
})
