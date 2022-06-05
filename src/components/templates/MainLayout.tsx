import { ReactNode, FC } from 'react'

type Props = {
  children: ReactNode
}

export const MainLayout: FC<Props> = ({ children }: Props) => (
  // TODO: メインレイアウト
  <main>{children}</main>
)
