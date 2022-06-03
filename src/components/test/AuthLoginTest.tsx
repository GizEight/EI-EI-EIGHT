import { FC, useState, useCallback, ChangeEvent, FormEvent } from 'react'

import { authEmailLogin } from '../../scripts/lib/firebase/auth'

export const AuthLoginTest: FC = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const onChangeUser = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [e.target.name]: e.target.value })
    },
    [user, setUser]
  )

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await authEmailLogin(user)
    // eslint-disable-next-line no-console
    console.log('res', res)
  }

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={onChangeUser}
        />
        <input
          type="text"
          name="password"
          value={user.password}
          onChange={onChangeUser}
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  )
}
