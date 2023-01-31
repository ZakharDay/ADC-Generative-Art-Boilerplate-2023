import { getRandomArbitrary, sample } from '../prototypes/utilities'

// Array structure
// [class-name, min-diameter, max-diameter, min-layer, max-layer]
//
// prettier-ignore
const circleTypes = [
  ['deepface-green-white',      10,  500,  2, 4],
  ['deepface-green-black',      10,  500,  2, 4],
  ['deepface-dark-green-white', 10,  500,  2, 4],
  ['deepface-dark-green-black', 10,  500,  2, 4],
  ['deepface-black',            10,  500,  2, 4],
  // ['circle-black',              30,  70,   1, 1],
  ['circle-white',              30,  70,   1, 1],
  // ['large-circle-black',        900, 1500, 1, 1],
  ['large-circle-white',        900, 1500, 1, 1],
]

function createCircle(container) {
  const circleElement = document.createElement('div')
  const circleType = sample(circleTypes)
  circleElement.classList.add('circle')

  const top = getRandomArbitrary(-100, 1720)
  const left = getRandomArbitrary(-100, 980)
  const size = getRandomArbitrary(circleType[1], circleType[2])

  circleElement.style.top = [top, 'px'].join('')
  circleElement.style.left = [left, 'px'].join('')
  circleElement.style.width = [size, 'px'].join('')
  circleElement.style.height = [size, 'px'].join('')

  circleElement.style.zIndex = Math.floor(
    getRandomArbitrary(circleType[3], circleType[4])
  )

  circleElement.style.transform = `rotate(${getRandomArbitrary(10, 350)}deg)`
  circleElement.classList.add(circleType[0])

  container.appendChild(circleElement)
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_24')
  const particlesQuantity = Math.floor(getRandomArbitrary(10, 20))

  for (var i = 0; i < particlesQuantity; i++) {
    createCircle(container)
  }
})
