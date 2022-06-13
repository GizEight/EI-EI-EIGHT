import { FC, ReactNode, ElementType } from 'react'

type Props = {
  children: ReactNode
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const SectionTitle: FC<Props> = ({ children, level = 'h2' }) => {
  const Header = `${level}` as ElementType
  return <Header className="p-section_title">{children}</Header>
}
