import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_43/Container'
import { initSketch } from '../prototypes/prototype_43/sketch'

import {
  getStoreShift,
  setStoreShift,
  getStoreEnthropy,
  setStoreEnthropy,
  getStoreEffect,
  setStoreEffect
} from '../prototypes/prototype_43/store'

const props = {
  shift: getStoreShift(),
  enthropy: getStoreEnthropy(),
  effect: getStoreEffect()
}

const actions = {
  setStoreShift,
  setStoreEnthropy,
  setStoreEffect
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_43')
  ReactDOM.render(
    <Container initSketch={initSketch} {...props} {...actions} />,
    container
  )
})
