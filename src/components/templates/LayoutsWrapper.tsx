import { ReactNode, FC, memo } from 'react'

import { FooterLayout } from './FooterLayout'
import { HeaderLayout } from './HeaderLayout'
import { MainLayout } from './MainLayout'

type Props = {
  children: ReactNode
}

export const LayoutsWrapper: FC<Props> = memo(({ children }: Props) => (
  <>
    <HeaderLayout />
    <MainLayout>{children}</MainLayout>
    <FooterLayout />
  </>
))
