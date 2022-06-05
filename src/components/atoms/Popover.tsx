import { ReactNode, FC } from 'react'

type Props = {
  children: ReactNode
}

export const Popover: FC<Props> = ({ children }: Props) => (
  <div className="popover">{children}</div>
)
