import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const SearchInput = () => (
  <label className="c-form search-label" htmlFor="search">
    <input type="text" className="c-form-search" id="search" />
    <FontAwesomeIcon
      size="lg"
      icon={['fab', 'searchengin']}
      className="c-form-search-icon"
    />
  </label>
)
        <FontAwesomeIcon
          size="lg"
          icon={['fas', 'magnifying-glass']}
          className="c-form-search-icon"
        />
