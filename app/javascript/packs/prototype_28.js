import { sample } from '../prototypes/utilities'

import { model } from '../prototypes/prototype_28/model'

import {
  getLargeCircleStore,
  setLargeCircleStore
} from '../prototypes/prototype_28/store'

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

function generateLargeCircles() {
  const sides = Object.keys(model.largeCircles.sides.vSides)

  return new Promise((resolve, reject) => {
    generateLargeCircle(sides)
      .then((sides) => {
        generateLargeCircle(sides)
      })
      .then(resolve)
  })
}

function generateLargeCircle(sides) {
  return new Promise((resolve, reject) => {
    const side = sample(sides)
    const index = sides.indexOf(side)

    console.log('BEFORE', sides)

    if (index > -1) {
      sides.splice(index, 1)
    }

    console.log('AFTER', sides)

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
  // const container = document.getElementById('prototype_28')
  generateStory()
})
