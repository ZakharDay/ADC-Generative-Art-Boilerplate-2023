import { getRandomArbitrary } from '../prototypes/prototype_1/utilities'

document.addEventListener('DOMContentLoaded', () => {
  console.log('Test ', getRandomArbitrary(0, 1))

  const container = document.getElementById('prototype_1')
  const frame = document.createElement('div')
  frame.innerText = 'Art Design & Coding Community'
  frame.classList.add('frame')
  container.appendChild(frame)
})
