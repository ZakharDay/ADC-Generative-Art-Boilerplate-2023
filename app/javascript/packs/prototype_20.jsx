import React from 'react'
import ReactDOM from 'react-dom'

import { props } from '../prototypes/prototype_20/settings/zakharday.js'

import Container from '../prototypes/prototype_20/Container'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_20')
  ReactDOM.render(<Container {...props} />, container)
})
