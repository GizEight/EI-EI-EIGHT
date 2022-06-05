import { ReactNode, FC } from 'react'

import { FooterLayout } from './FooterLayout'
import { HeaderLayout } from './HeaderLayout'
import { MainLayout } from './MainLayout'

type Props = {
  children: ReactNode
}

export const LayoutsWrapper: FC<Props> = ({ children }: Props) => (
  <>
    <HeaderLayout />
    <MainLayout>{children}</MainLayout>
    <FooterLayout />
  </>
)
