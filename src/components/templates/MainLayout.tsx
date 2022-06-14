import { ReactNode, FC, memo } from 'react'

type Props = {
  children: ReactNode
}

export const MainLayout: FC<Props> = memo(({ children }: Props) => (
  // TODO: メインレイアウト
  <main className="l-main">{children}</main>
))
