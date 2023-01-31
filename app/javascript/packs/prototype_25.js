import {
  getLargeWhiteCircleStore,
  setLargeWhiteCircleStore
} from '../prototypes/prototype_25/store'

function createLargeWhiteCircle() {
  const array = ['a', 'b', 'c']
  setLargeWhiteCircleStore(array)

  console.log('Test', getLargeWhiteCircleStore())

  array.push('z')
  setLargeWhiteCircleStore(array)

  console.log('Test', getLargeWhiteCircleStore())
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_25')
  createLargeWhiteCircle()
})
