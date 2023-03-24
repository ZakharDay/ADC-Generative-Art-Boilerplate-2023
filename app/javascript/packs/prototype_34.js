import p5 from 'p5'
import { getRandomArbitrary, generateHash } from '../prototypes/utilities'

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

let canvas
let p5instance

function sketch(p) {
  p.setup = () => {
    canvas = p.createCanvas(canvasSize.width, canvasSize.height)
    p.frameRate(30)
    p.background(0)
  }

  p.draw = () => {
    w = getRandomArbitrary(20, 80)
    h = getRandomArbitrary(20, 80)

    x = getRandomArbitrary(0, canvasSize.width - w)
    y = getRandomArbitrary(0, canvasSize.height - h)

    if (clearCanvas) {
      // p.clear()
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

  const saveButton = document.createElement('div')
  saveButton.classList.add('saveButton')
  saveButton.innerText = 'Save'

  saveButton.addEventListener('click', () => {
    downloadImage()
  })

  wrapper.appendChild(toggleSwitch)
  wrapper.appendChild(resetButton)
  wrapper.appendChild(saveButton)
  document.body.appendChild(wrapper)
}

function downloadImage() {
  // //
  // // With P5
  // //

  p5instance.saveCanvas(canvas, `Prototype-34-${generateHash()}`, 'png')

  // //
  // // Without P5
  // //

  // const canvasElement = document.getElementById('defaultCanvas0')
  // const imageData = canvasElement.toDataURL('image/png')

  // const link = document.createElement('a')
  // link.download = `Prototype-34-${generateHash()}.png`
  // link.href = imageData
  // link.click()
  // link.remove()
}

document.addEventListener('DOMContentLoaded', () => {
  canvasSize.width = window.innerWidth
  canvasSize.height = window.innerHeight

  p5instance = new p5(sketch)
  renderUI()
})
