import { FC, memo } from 'react'

type Props = {
  children: string
}

export const ErrorMessage: FC<Props> = memo(({ children }: Props) => (
  <p className="u-text-error">{children}</p>
))
