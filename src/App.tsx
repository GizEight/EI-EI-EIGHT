import { FC, useEffect } from 'react'

import { AuthTest } from './components/test/AuthTest'
import { fetchUsers } from './scripts/lib/api'

const App: FC = () => {
  // * test
  useEffect(() => {
    fetchUsers({ limit: 1 }).then((res) => {
      // eslint-disable-next-line no-console
      console.log('res', res)
    })
  }, [])

  return (
    <div className="App">
      EI-EI-EIGHT
      <div style={{ marginTop: '30px' }} />
      <AuthTest />
    </div>
  )
}

export default App
