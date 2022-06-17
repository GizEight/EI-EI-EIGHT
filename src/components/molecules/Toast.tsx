import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { FC, ReactNode, useCallback, memo } from 'react'

import { ToastType } from '../../@types/view'

type Props = {
  children: ReactNode
  type: ToastType
  isLoading?: boolean
  onCLickCloseIcon: () => void
}

export const Toast: FC<Props> = memo((props: Props) => {
  const { children, type, isLoading = false, onCLickCloseIcon } = props

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

  return (
    <div className={clsx('c-toast', type, isLoading && 'c-toast-loading')}>
      {!isLoading && (
        <FontAwesomeIcon
          className="c-toast_icon"
          icon={['fas', changeIconBy(type)]}
        />
      )}
      <span className="u-icon-tex">{children}</span>
      {!isLoading && (
        <span className="c-toast_btn-close">
          <FontAwesomeIcon onClick={onCLickCloseIcon} icon={['fas', 'xmark']} />
        </span>
      )}
    </div>
  )
})
