import React from 'react'
import ReactDOM from 'react-dom'

import { props } from '../prototypes/prototype_21/settings/zakharday.js'

import Container from '../prototypes/prototype_21/Container'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_21')
  ReactDOM.render(<Container {...props} />, container)
})
