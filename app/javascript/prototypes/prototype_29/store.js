let backgroundColorClass = ''
let largeCircleStore = []

function getBackgroundColorClass() {
  return backgroundColorClass
}

function setBackgroundColorClass(className) {
  backgroundColorClass = className
}

function getLargeCircleStore() {
  return largeCircleStore
}

function setLargeCircleStore(data) {
  largeCircleStore = data
}

export {
  getBackgroundColorClass,
  setBackgroundColorClass,
  getLargeCircleStore,
  setLargeCircleStore
}
