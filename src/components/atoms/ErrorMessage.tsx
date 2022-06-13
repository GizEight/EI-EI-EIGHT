import { FC, memo } from 'react'

type Props = {
  message: string
}

export const ErrorMessage: FC<Props> = memo(({ message }: Props) => (
  <p className="u-text-error">{message}</p>
))
