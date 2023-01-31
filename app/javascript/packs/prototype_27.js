import { sample } from '../prototypes/utilities'

import {
  getLargeWhiteCircleStore,
  setLargeWhiteCircleStore
} from '../prototypes/prototype_27/store'

function createLargeWhiteCircle() {
  return new Promise((resolve, reject) => {
    const largeWhiteCircleStore = getLargeWhiteCircleStore()
    let side

    if (largeWhiteCircleStore.length == 0) {
      const sides = ['top', 'bottom']
      side = sample(sides)
    } else {
      if (largeWhiteCircleStore[0] === 'top') {
        side = 'bottom'
      } else if (largeWhiteCircleStore[0] === 'bottom') {
        side = 'top'
      }
    }

    largeWhiteCircleStore.push(side)

    resolve()
  })
}

function check() {
  console.log(getLargeWhiteCircleStore())
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_27')
  createLargeWhiteCircle().then(createLargeWhiteCircle).then(check)
})
