import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  type: 'success' | 'warning' | 'error' | 'info'
  isShow?: boolean
}

export const Toast: FC<Props> = (props: Props) => {
  const { children, type, isShow = false } = props

  const iconClose = () => {
    console.log('close')
  }

  // typeによって表示させるtoastを出し分ける
  const switchToast = () => {
    let toastType: ReactNode = null
    switch (type) {
      case 'success':
        toastType = (
          <div
            className={isShow ? 'toast success' : 'toast success toast_fadeout'}
          >
            <FontAwesomeIcon
              className="toast_icon"
              icon={['fas', 'circle-check']}
            />
            <span className="iconwithtext">{children}</span>
            <span className="toast_closebtn">
              <FontAwesomeIcon onClick={iconClose} icon={['fas', 'xmark']} />
            </span>
          </div>
        )
        break

      case 'error':
        toastType = (
          <div className="toast error">
            <FontAwesomeIcon
              className="toast_icon"
              icon={['fas', 'circle-check']}
            />
            {children}
          </div>
        )
        break

      case 'warning':
        toastType = (
          <div className="toast warning">
            <FontAwesomeIcon
              className="toast_icon"
              icon={['fas', 'circle-check']}
            />
            {children}
          </div>
        )
        break

      case 'info':
        toastType = (
          <div className="toast info">
            <FontAwesomeIcon
              className="toast_icon"
              icon={['fas', 'circle-check']}
            />
            {children}
          </div>
        )
        break

      default:
        toastType = null
        break
    }

    return toastType
  }

  // バツボタンを押したらトーストがフェード
  return <>{switchToast()}</>
}
