import { FC, useCallback } from 'react'

import { authGoogleLogin } from '../../scripts/lib/firebase/auth'

export const AuthTest: FC = () => {
  const onClickGoogleLogin = useCallback(async () => {
    const res = await authGoogleLogin()
    // eslint-disable-next-line no-console
    console.log('res', res)
  }, [])

  return (
    <div>
      <button type="button" onClick={onClickGoogleLogin}>
        Googleログイン
      </button>
    </div>
  )
}
