import { getRandomArbitrary } from '../prototypes/utilities'

const frameRate = 30

const canvasSize = {
  width: 0,
  height: 0
}

let colorSwitch = false

let w = 0
let h = 0

let x = 0
let y = 0

let r = 0
let g = 0
let b = 0

let container

function addRectangle() {
  w = getRandomArbitrary(20, 80)
  h = getRandomArbitrary(20, 80)

  x = getRandomArbitrary(0, canvasSize.width - w)
  y = getRandomArbitrary(0, canvasSize.height - h)

  r = getRandomArbitrary(0, 255)
  g = getRandomArbitrary(0, 255)
  b = getRandomArbitrary(0, 255)

  const rectangle = document.createElement('div')
  rectangle.style.width = w + 'px'
  rectangle.style.height = h + 'px'

  rectangle.style.top = y + 'px'
  rectangle.style.left = x + 'px'

  if (colorSwitch) {
    rectangle.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  } else {
    // rectangle.style.backgroundColor = `rgb(${r}, ${r}, ${r})`
    let hC = getRandomArbitrary(0, 360)
    let sC = getRandomArbitrary(0, 100)
    let lC = getRandomArbitrary(0, 100)
    rectangle.style.backgroundColor = `hsl(${hC}, ${sC}, ${lC})`
  }

  container.appendChild(rectangle)
}

function clearCanvas() {
  container.innerHTML = ''
}

function renderUI() {
  const wrapper = document.createElement('div')
  wrapper.classList.add('wrapper')

  const toggleSwitch = document.createElement('div')
  toggleSwitch.classList.add('toggleSwitch')
  toggleSwitch.innerText = 'Toggle Color'

  toggleSwitch.addEventListener('click', () => {
    toggleSwitch.classList.toggle('active')
    colorSwitch = !colorSwitch
  })

  const resetButton = document.createElement('div')
  resetButton.classList.add('resetButton')
  resetButton.innerText = 'Clear'

  resetButton.addEventListener('click', () => {
    clearCanvas()
  })

  wrapper.appendChild(toggleSwitch)
  wrapper.appendChild(resetButton)
  document.body.appendChild(wrapper)
}

document.addEventListener('DOMContentLoaded', () => {
  container = document.getElementById('prototype_35')

  canvasSize.width = window.innerWidth
  canvasSize.height = window.innerHeight

  renderUI()
  setInterval(addRectangle, 1000 / frameRate)
})
