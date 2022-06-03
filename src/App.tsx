import { FC, useEffect } from 'react'

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
    </div>
  )
}

export default App
