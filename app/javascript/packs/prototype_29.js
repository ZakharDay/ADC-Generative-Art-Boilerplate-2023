import { sample } from '../prototypes/utilities'

import { model } from '../prototypes/prototype_29/model'

import {
  getLargeCircleStore,
  setLargeCircleStore
} from '../prototypes/prototype_29/store'

Number.prototype.times = function (cb) {
  var i = -1

  while (++i < this) {
    cb(i)
  }

  return +this
}

// выбрать цвет фона

// указать сторону, размер кругов и цвет

// определить рэнджи для каждого параметра
// и каждой стороны/размера

// сгенерировать CSS

// создать текстовый блок (contenteditable)

// сгенерировать положение текстового блока

// сгенерировать текст (выбрать из массива)

// указать блоку текст и CSS

// выбрать цвет дипфейса

// в CSS сверстать дипфейса
const sides = Object.keys(model.largeCircles.sides.vSides)

function generateLargeCircles() {
  return new Promise((resolve, reject) => {
    const promises = []

    console.log('SIDES', sides)

    // prettier-ignore
    sides.length.times(function (i) {
      console.log(i)
    })

    // sides.forEach((side, i) => {
    //   const promise = generateLargeCircle(side)
    //   promises.push(promise)
    // })

    console.log('PROMISES', promises)

    Promise.all(promises).then(resolve)
  })
}

function generateLargeCircle(side) {
  return new Promise((resolve, reject) => {
    const largeCircleStore = getLargeCircleStore()
    largeCircleStore.push(side)
    setLargeCircleStore(largeCircleStore)

    resolve(sides)
  })
}

function check() {
  console.log('STORE', getLargeCircleStore())
}

function generateStory() {
  generateLargeCircles().then(check)
  // prettier-ignore
  // generateBackground()
  // .then(generateLargeCircle)
  // .then(generateLargeCircle)
  // .then(generateText)
  // .then(checkRect)
}

document.addEventListener('DOMContentLoaded', () => {
  // const container = document.getElementById('prototype_29')
  generateStory()
})
