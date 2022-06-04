import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectToast, closeToast, setToast } from '../../app/slices/toastSlice'
import { LOGIN_SUCCESS_MESSAGE, TOAST_DURATION_TIME } from '../utils/const'

export const useToast = () => {
  const dispatch = useAppDispatch()
  const { toast } = useAppSelector(selectToast)

  const onClickCloseToast = useCallback(() => dispatch(closeToast()), [])

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

  return { toast, onClickCloseToast, resetToast, loginSuccessToast }
}
