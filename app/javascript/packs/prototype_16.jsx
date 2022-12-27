import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_16/Container'

const settings = require('../prototypes/prototype_16/settings/zakharday.json')

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_16')
  ReactDOM.render(<Container {...settings} />, container)
})
