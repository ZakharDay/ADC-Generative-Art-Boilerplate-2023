import { sample, getRandomArbitrary } from '../prototypes/utilities'

import { model } from '../prototypes/prototype_30/model'

import {
  setBackgroundColorClass,
  getLargeCircleStore,
  setLargeCircleStore
} from '../prototypes/prototype_30/store'

Number.prototype.times = function (cb) {
  var i = -1

  while (++i < this) {
    cb(i)
  }

  return +this
}

let container

function generateLargeCircle() {
  return new Promise((resolve, reject) => {
    const largeCircleStore = getLargeCircleStore()
    const { sides, sizes } = model.largeCircles
    const vSides = Object.keys(sides.vSides)
    const hSides = Object.keys(sides.hSides)
    const sizeKeys = Object.keys(sizes)

    // prettier-ignore
    ;(2).times((i) => {
      const vSide = sample(vSides)
      const hSide = sample(hSides)
      const size = sample(sizeKeys)

      const vSideParams = sides.vSides[vSide]
      const hSideParams = sides.hSides[hSide]
      const sizeParams = sizes[size]
      const sizeInPixels = getRandomArbitrary(sizeParams.from, sizeParams.to) + 'px'
      // console.log('SIDES', vSide, hSide)

      // Генерируем HTML

      const circle = document.createElement('div')
      circle.classList.add('largeCircle')

      if (vSide === 'top') {
        circle.style.top = getRandomArbitrary(vSideParams.from, vSideParams.to) + 'px'
      }

      if (vSide === 'bottom') {
        circle.style.bottom = getRandomArbitrary(vSideParams.from, vSideParams.to) + 'px'
      }

      if (hSide === 'left') {
        circle.style.left = getRandomArbitrary(hSideParams.from, hSideParams.to) + 'px'
      }

      if (hSide === 'right') {
        circle.style.right = getRandomArbitrary(hSideParams.from, hSideParams.to) + 'px'
      }

      circle.style.width = sizeInPixels
      circle.style.height = sizeInPixels

      container.appendChild(circle)

      // Обновляем данные

      vSides.splice(vSides.indexOf(vSide), 1)
      hSides.splice(hSides.indexOf(hSide), 1)

      // console.log(vSides, hSides)
    })

    resolve()
  })
}

function generateBackground() {
  return new Promise((resolve, reject) => {
    const background = sample(model.background)
    container.classList.add(background)
    setBackgroundColorClass(background)

    resolve()
  })
}

function generateText() {
  const { strings, sides } = model.texts
  const string = sample(strings)
  const side = sample(sides)

  const wrapper = document.createElement('div')
  wrapper.classList.add('textWrapper')
  wrapper.classList.add(side)

  const text = document.createElement('div')
  text.innerText = string
  text.contentEditable = true
  text.classList.add('text')

  wrapper.appendChild(text)
  container.appendChild(wrapper)
}

function generateStory() {
  // prettier-ignore
  generateBackground()
    .then(generateLargeCircle)
    .then(generateText)
}

document.addEventListener('DOMContentLoaded', () => {
  container = document.getElementById('prototype_30')
  generateStory()
})
