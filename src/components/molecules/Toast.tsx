import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, ReactNode, useCallback, memo } from 'react'

import { ToastType } from '../../@types/view'

type Props = {
  children: ReactNode
  type: ToastType
  isShow: boolean
  onCLickCloseIcon: () => void
}

export const Toast: FC<Props> = memo((props: Props) => {
  const { children, type, isShow, onCLickCloseIcon } = props

  const changeIconBy = useCallback((toastType: ToastType) => {
    switch (toastType) {
      case 'warning':
      case 'error':
        return 'circle-exclamation'
      case 'info':
        return 'circle-info'
      case 'success':
      default:
        return 'circle-check'
    }
  }, [])

  const switchToast = () => (
    <div
      className={`c-toast ${type} ${!isShow ? 'c-toast_fadeout' : undefined}`}
    >
      <FontAwesomeIcon
        className="c-toast_icon"
        icon={['fas', changeIconBy(type)]}
      />
      <span className="u-icon-tex">{children}</span>
      <span className="c-toast_btn-close">
        <FontAwesomeIcon onClick={onCLickCloseIcon} icon={['fas', 'xmark']} />
      </span>
    </div>
  )

  return <>{switchToast()}</>
})
