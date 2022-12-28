import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_17/Container'

const settings = require('../prototypes/prototype_17/settings/zakharday.json')

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_17')
  ReactDOM.render(<Container {...settings} />, container)
})
