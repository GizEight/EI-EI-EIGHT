import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { APP_TITLE } from '../../scripts/utils/const'

export const FooterLayout = () => {
  const members: string[] = ['Kira Tanaka', 'Kazumaru Katou', 'Seiya Iwanabe']

  return (
    <footer className="l-footer">
      <div className="l-footer_inner">
        <div className="l-footer_title-with-icon">
          {/* TODO: アイコンの表示 */}
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
}
