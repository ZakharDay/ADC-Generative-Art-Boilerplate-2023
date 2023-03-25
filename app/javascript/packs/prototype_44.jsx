import React from 'react'
import ReactDOM from 'react-dom'

import Container from '../prototypes/prototype_44/Container'
import { initSketch } from '../prototypes/prototype_44/sketch'

import {
  initSound,
  handleMelodySequenceChange,
  handleMelodySoundPresetChange
} from '../prototypes/prototype_44/sound'

import {
  getStoreShift,
  setStoreShift,
  getStoreEnthropy,
  setStoreEnthropy,
  getStoreEffect,
  setStoreEffect
} from '../prototypes/prototype_44/store'

const props = {
  sketchId: 'sketch',
  shift: getStoreShift(),
  enthropy: getStoreEnthropy(),
  effect: getStoreEffect()
}

const actions = {
  initSketch,
  initSound,
  setStoreShift,
  setStoreEnthropy,
  setStoreEffect,
  handleMelodySequenceChange,
  handleMelodySoundPresetChange
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_44')
  ReactDOM.render(<Container {...props} {...actions} />, container)
})
