import { sample } from '../prototypes/utilities'

function createLargeWhiteCircle() {
  return new Promise((resolve, reject) => {
    const sides = ['top', 'bottom']
    const side = sample(sides)

    console.log('createLargeWhiteCircle')

    resolve(side)
  })
}

function check(side) {
  console.log('check')
  console.log(side)
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')
  const container = document.getElementById('prototype_26')

  // prettier-ignore
  console.log(
    createLargeWhiteCircle().then(
      (side) => { check(side) }
    )
  )
})
