import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_47/Container'
import { initSketch } from '../prototypes/prototype_47/sketch'

import {
  getStoreShift,
  setStoreShift,
  getStoreEnthropy,
  setStoreEnthropy,
  getStoreEffect,
  setStoreEffect
} from '../prototypes/prototype_47/store'

const props = {
  sketchId: 'sketch',
  shift: getStoreShift(),
  enthropy: getStoreEnthropy(),
  effect: getStoreEffect()
}

const actions = {
  initSketch,
  setStoreShift,
  setStoreEnthropy,
  setStoreEffect
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_47')
  ReactDOM.render(<Container {...props} {...actions} />, container)
})
