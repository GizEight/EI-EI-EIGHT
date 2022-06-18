import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo } from 'react'

import { APP_TITLE } from '../../scripts/utils/const'

export const FooterLayout = memo(() => {
  const members: string[] = ['Kira Tanaka', 'Kazumaru Katou', 'Seiya Iwanabe']

  return (
    <footer className="l-footer">
      <div className="l-footer_inner">
        <div className="l-footer_title-with-icon">
          <FontAwesomeIcon icon={['fas', 'lightbulb']} />
          <span>{APP_TITLE}</span>
        </div>
        <span className="l-footer_horizon" />
        <div className="l-footer_friends">
          {members.map((member) => (
            <p key={member}>{member}</p>
          ))}
        </div>
      </div>
    </footer>
  )
})
