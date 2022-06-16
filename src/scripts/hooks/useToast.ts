import { useCallback } from 'react'

import { ToastType } from '../../@types/view'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectToast,
  closeToast,
  setToast,
  setLoadingToastIsShow,
} from '../../app/slices/toastSlice'
import { LOGIN_SUCCESS_MESSAGE, TOAST_DURATION_TIME } from '../utils/const'

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

  const resetToast = useCallback(() => {
    dispatch(
      setToast({
        type: 'success',
        message: toast.message,
        isShow: false,
      })
    )
  }, [dispatch, setToast])

  const loginSuccessToast = useCallback(() => {
    dispatch(
      setToast({
        type: 'success',
        message: LOGIN_SUCCESS_MESSAGE,
        isShow: true,
      })
    )
    // TODO: 時間経って消えていく処理
    setTimeout(() => resetToast, TOAST_DURATION_TIME)
  }, [resetToast, dispatch, setToast])

  const showErrorToast = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (res: any) => {
      dispatch(
        setToast({
          isShow: true,
          type: 'error',
          message: `code: ${res.errCode} - ${res.errMsg}`,
        })
      )
    },
    [dispatch, setToast]
  )

  return {
    toast,
    showToast,
    onClickCloseToast,
    resetToast,
    loginSuccessToast,
    showErrorToast,
  }
}
