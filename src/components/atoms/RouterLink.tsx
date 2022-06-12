import { ReactNode, FC } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: ReactNode
  to: string
  isBtn?: boolean
}

export const RouterLink: FC<Props> = (props: Props) => {
  const { children, to, isBtn = false } = props
  return (
    <Link to={to} className={isBtn ? 'c-btn' : undefined}>
      {children}
    </Link>
  )
}
