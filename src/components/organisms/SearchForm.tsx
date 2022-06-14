import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, memo, useCallback } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { ErrorMessage } from '../atoms/ErrorMessage'

type Input = {
  searchInput: string
}

export const SearchForm: FC = memo(() => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Input>()

  console.log('render search form')

  const onSubmitForm: SubmitHandler<Input> = useCallback(
    (data: Input) =>
      // eslint-disable-next-line no-console
      console.log('data', data.searchInput),
    []
  )

  return (
    <>
      {errors.searchInput && (
        <ErrorMessage>
          {errors.searchInput.message || '正しい形式で入力してください。'}
        </ErrorMessage>
      )}
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="c-form search-label"
      >
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
