import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_18/Container'

const settings = require('../prototypes/prototype_18/settings/zakharday.json')

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_18')
  ReactDOM.render(<Container {...settings} />, container)
})
