import { isNil } from 'lodash'
import { ReactNode, FC } from 'react'

type Props = {
  children: ReactNode
  sectionName?: string
}

export const SectionLayout: FC<Props> = ({ children, sectionName }) => (
  <section
    className={`p-section ${!isNil(sectionName) && `p-section-${sectionName}`}`}
  >
    <div className="p-section_inner">{children}</div>
  </section>
)
