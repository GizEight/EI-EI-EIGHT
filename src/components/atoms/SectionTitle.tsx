import clsx from 'clsx'
import { FC, memo, ReactNode, ElementType } from 'react'

type Props = {
  children: ReactNode
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const SectionTitle: FC<Props> = memo(
  ({ children, level = 'h2' }: Props) => {
    const Header = `${level}` as ElementType
    return (
      <Header
        className={clsx(
          'p-section_title',
          children === 'Articles' ? 'u-title-margin-top' : null
        )}
      >
        {children}
      </Header>
    )
  }
)
