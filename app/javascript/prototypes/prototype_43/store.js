let shift = false
let enthropy = false
let effect = false

function getStoreShift() {
  return shift
}

function setStoreShift(data) {
  shift = data
}

function getStoreEnthropy() {
  return enthropy
}

function setStoreEnthropy(data) {
  enthropy = data
}

function getStoreEffect() {
  return effect
}

function setStoreEffect(data) {
  effect = data
}

export {
  getStoreShift,
  setStoreShift,
  getStoreEnthropy,
  setStoreEnthropy,
  getStoreEffect,
  setStoreEffect
}
