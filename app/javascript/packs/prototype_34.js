import p5 from 'p5'
import { getRandomArbitrary } from '../prototypes/utilities'

const canvasSize = {
  width: 0,
  height: 0
}

let colorSwitch = false
let clearCanvas = false

let x = 0
let y = 0
let w = 0
let h = 0
let c = 0
let r = 0
let g = 0
let b = 0

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(canvasSize.width, canvasSize.height)
    canvas.parent('prototype_34')
    p.frameRate(30)
    p.background(0)
  }

  p.draw = () => {
    w = getRandomArbitrary(20, 80)
    h = getRandomArbitrary(20, 80)

    x = getRandomArbitrary(0, canvasSize.width - w)
    y = getRandomArbitrary(0, canvasSize.height - h)

    if (clearCanvas) {
      p.background(0)
      clearCanvas = false
    }

    if (colorSwitch) {
      r = getRandomArbitrary(0, 255)
      g = getRandomArbitrary(0, 255)
      b = getRandomArbitrary(0, 255)

      p.fill(r, g, b)
    } else {
      c = getRandomArbitrary(0, 255)
      p.fill(c)
    }

    p.rect(x, y, w, h)
  }
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
    clearCanvas = true
  })

  wrapper.appendChild(toggleSwitch)
  wrapper.appendChild(resetButton)
  document.body.appendChild(wrapper)
}

document.addEventListener('DOMContentLoaded', () => {
  canvasSize.width = window.innerWidth
  canvasSize.height = window.innerHeight

  new p5(sketch)
  renderUI()
})
