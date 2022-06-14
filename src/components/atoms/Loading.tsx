import { memo } from 'react'
import { Watch } from 'react-loader-spinner'

export const Loading = memo(() => (
  <div className="p-loading">
    <Watch color="#f9e61f" />
  </div>
))
