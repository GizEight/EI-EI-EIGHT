import { ReactNode, FC, memo } from 'react'

type Props = {
  children: ReactNode
}

export const Popover: FC<Props> = memo(({ children }: Props) => (
  <div className="c-popover">{children}</div>
))
