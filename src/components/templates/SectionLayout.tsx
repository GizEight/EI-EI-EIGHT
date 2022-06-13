import { ReactNode, FC } from 'react'

type Props = {
  children: ReactNode
}

export const SectionLayout: FC<Props> = ({ children }) => (
  <section className="p-section">
    <div className="p-section_inner">{children}</div>
  </section>
)
