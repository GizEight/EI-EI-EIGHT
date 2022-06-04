import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  type: 'success' | 'warning' | 'error' | 'info'
  isShow?: boolean
}

export const Toast: FC<Props> = (props: Props) => {
  const { children, type, isShow = false } = props

  const switchToast = () => {
    let toastType = null
    switch (type) {
      case 'success':
        toastType = (
          <div className="c-toast">
            <FontAwesomeIcon
              className="c-toast_icon"
              icon={['fas', 'circle-check']}
            />
            {children}
          </div>
        )
        return toastType
      case 'error':
        toastType = (
          <div className="c-toast error">
            <FontAwesomeIcon
              className="c-toast_icon"
              icon={['fas', 'circle-check']}
            />
            {children}
          </div>
        )
        return toastType
      default:
        toastType = (
          <div>
            <FontAwesomeIcon icon={['fas', 'circle-check']} />

            {children}
          </div>
        )
    }

    return toastType
  }
  return <>{switchToast()}</>
}
