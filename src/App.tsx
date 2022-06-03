import { FC, useEffect } from 'react'

import { AuthLoginTest } from './components/test/AuthLoginTest'
import { AuthTest } from './components/test/AuthTest'
import { test } from './scripts/lib/api'

const App: FC = () => {
  // * test
  useEffect(() => {
    test()
  }, [])

  return (
    <div className="App">
      EI-EI-EIGHT
      <div style={{ marginTop: '30px' }} />
      <AuthTest />
      <AuthLoginTest />
    </div>
  )
}

export default App
