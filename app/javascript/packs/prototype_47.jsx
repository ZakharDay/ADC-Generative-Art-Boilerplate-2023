import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_47/Container'
import { initSketch } from '../prototypes/prototype_47/sketch'

import {
  getStoreWaveAmplitude,
  setStoreWaveAmplitude
} from '../prototypes/prototype_47/store'

const props = {
  sketchId: 'sketch',
  waveAmplitude: getStoreWaveAmplitude()
}

const actions = {
  initSketch,
  getStoreWaveAmplitude,
  setStoreWaveAmplitude
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_47')
  ReactDOM.render(<Container {...props} {...actions} />, container)
})
