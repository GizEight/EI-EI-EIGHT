import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, ReactNode, useCallback, memo } from 'react'

import { ToastType } from '../../@types/view'

type Props = {
  children: ReactNode
  type: ToastType
  isShow: boolean
  iconClose: () => void
}

// eslint-disable-next-line react/display-name
export const Toast: FC<Props> = memo((props: Props) => {
  const { children, type, isShow, iconClose } = props

  const changeIconBy = useCallback((toastType: ToastType) => {
    switch (toastType) {
      case 'success':
        return 'circle-check'
      case 'warning':
        return 'circle-exclamation'
      case 'error':
        return 'circle-exclamation'
      case 'info':
        return 'circle-info'
      default:
        return 'circle-check'
    }
  }, [])

  // typeによって表示させるtoastを出し分ける
  const switchToast = () => (
    <div className={`toast ${type} ${!isShow ? 'toast_fadeout' : undefined}`}>
      <FontAwesomeIcon
        className="toast_icon"
        icon={['fas', changeIconBy(type)]}
      />
      <span className="iconwithtext">{children}</span>
      <span className="toast_closebtn">
        <FontAwesomeIcon onClick={iconClose} icon={['fas', 'xmark']} />
      </span>
    </div>
  )

  // バツボタンを押したらトーストがフェード
  return <>{switchToast()}</>
})
