import React from 'react'
import ReactDOM from 'react-dom'

import { props } from '../prototypes/prototype_19/settings/zakharday.js'

import Container from '../prototypes/prototype_19/Container'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_19')
  ReactDOM.render(<Container {...props} />, container)
})
