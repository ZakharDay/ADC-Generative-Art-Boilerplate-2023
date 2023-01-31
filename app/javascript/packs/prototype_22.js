import { getRandomArbitrary, sample } from '../prototypes/utilities'

const colors = ['#00FF29', '#79FF39', '#CFCFCF', '#C5C5C5', '#8D8D8D']

function createCircle(container) {
  const circleElement = document.createElement('div')
  circleElement.classList.add('circle')

  const top = getRandomArbitrary(-100, 1720)
  const left = getRandomArbitrary(-100, 980)
  const size = getRandomArbitrary(10, 500)

  circleElement.style.top = [top, 'px'].join('')
  circleElement.style.left = [left, 'px'].join('')
  circleElement.style.width = [size, 'px'].join('')
  circleElement.style.height = [size, 'px'].join('')
  circleElement.style.backgroundColor = sample(colors)

  container.appendChild(circleElement)
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prototype_22')

  for (var i = 0; i < 50; i++) {
    createCircle(container)
  }
})
