import { useCallback } from 'react'

import { ToastType } from '../../@types/view'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectToast,
  closeToast,
  setToast,
  setLoadingToastIsShow,
} from '../../app/slices/toastSlice'
import { TOAST_DURATION_TIME } from '../utils/const'

export const useToast = () => {
  const dispatch = useAppDispatch()
  const { toast, loadingToast } = useAppSelector(selectToast)

  const onClickCloseToast = useCallback(() => dispatch(closeToast()), [])

  const showToast = useCallback((type: ToastType, message: string) => {
    dispatch(
      setToast({
        type,
        message,
        isShow: true,
      })
    )
    setTimeout(
      () =>
        dispatch(
          setToast({
            type: 'success',
            message: '',
            isShow: false,
          })
        ),
      TOAST_DURATION_TIME
    )
  }, [])

  const showLoadingToast = useCallback(() => {
    dispatch(setLoadingToastIsShow(true))
  }, [])

  return {
    toast,
    loadingToast,
    showToast,
    onClickCloseToast,
  }
}
