import p5 from 'p5'
import { getRandomArbitrary } from '../prototypes/utilities'

const prototypeId = 'prototype_36'
const canvas = {}

let colorSwitch = false
let clearCanvas = false

let x, y, width, height, hue, saturation, brightness

function calcHue(percent) {
  return Math.floor(percent * 3.6)
}

function sketch(p) {
  p.setup = () => {
    hue = getRandomArbitrary(0, 360)
    brightness = getRandomArbitrary(0, 100)

    canvas.element = p.createCanvas(canvas.width, canvas.height)
    canvas.element.parent(prototypeId)

    p.frameRate(30)
    p.background(0)
    p.colorMode(p.HSB)
  }

  p.draw = () => {
    width = getRandomArbitrary(20, 80)
    height = getRandomArbitrary(20, 80)

    x = getRandomArbitrary(0, canvas.width - width)
    y = getRandomArbitrary(0, canvas.height - height)

    if (clearCanvas) {
      p.background(0)
      clearCanvas = false
    }

    if (colorSwitch) {
      saturation = getRandomArbitrary(0, 100)
      brightness = getRandomArbitrary(0, 100)
      p.fill(hue, saturation, brightness)
    } else {
      p.fill(hue, 0, brightness)
    }

    p.rect(x, y, width, height)
  }
}

function renderUI() {
  const wrapper = document.createElement('div')
  wrapper.classList.add('wrapper')

  const sliderWrapper = document.createElement('div')
  sliderWrapper.classList.add('sliderWrapper')

  const slider = document.createElement('input')
  slider.classList.add('slider')
  slider.type = 'range'
  slider.step = 1
  slider.min = 0
  slider.max = 100
  slider.value = brightness

  slider.addEventListener('input', (e) => {
    if (colorSwitch) {
      hue = calcHue(e.target.value)
    } else {
      brightness = e.target.value
    }
  })

  const toggleSwitch = document.createElement('div')
  toggleSwitch.classList.add('toggleSwitch')
  toggleSwitch.innerText = 'Toggle Color'

  toggleSwitch.addEventListener('click', () => {
    toggleSwitch.classList.toggle('active')
    colorSwitch = !colorSwitch

    if (colorSwitch) {
      slider.value = calcHue(e.target.value)
    } else {
      slider.value = brightness
    }
  })

  const resetButton = document.createElement('div')
  resetButton.classList.add('resetButton')
  resetButton.innerText = 'Clear'

  resetButton.addEventListener('click', () => {
    clearCanvas = true
  })

  sliderWrapper.appendChild(slider)
  wrapper.appendChild(sliderWrapper)
  wrapper.appendChild(toggleSwitch)
  wrapper.appendChild(resetButton)
  document.body.appendChild(wrapper)
}

document.addEventListener('DOMContentLoaded', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  new p5(sketch)

  setTimeout(renderUI, 300)
})
