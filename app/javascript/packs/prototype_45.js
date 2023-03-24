import p5 from 'p5'
import html2canvas from 'html2canvas'
import { getRandomArbitrary, generateHash } from '../prototypes/utilities'

let x = 0
let y = 0

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(700, 410)
    canvas.parent('wrapper')
    p.frameRate(1)
    // p.background(0)
  }

  p.draw = () => {
    x = getRandomArbitrary(0, 650)
    y = getRandomArbitrary(0, 350)

    p.clear()
    p.background(0, 0, 0, 0)
    p.fill(100)
    p.rect(x, y, 50, 50)
  }
}

function init() {
  return new Promise((resolve, reject) => {
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    wrapper.id = 'wrapper'

    const image = document.createElement('div')
    image.classList.add('image')

    const container = document.getElementById('prototype_45')

    wrapper.appendChild(image)
    container.appendChild(wrapper)

    const saveButton = document.createElement('div')
    saveButton.classList.add('saveButton')
    saveButton.innerText = 'Save'
    document.body.appendChild(saveButton)

    saveButton.addEventListener('click', () => {
      generateImage().then(downloadImage)
    })

    resolve()
  })
}

function generateImage() {
  return new Promise((resolve, reject) => {
    const container = document.getElementById('wrapper')

    html2canvas(container).then((canvas) => {
      canvas.style.position = 'absolute'
      canvas.style.left = '-99999px'
      canvas.id = 'tempCanvas'
      document.body.appendChild(canvas)

      resolve()
    })
  })
}

function downloadImage() {
  const canvas = document.getElementById('tempCanvas')
  const imageData = canvas.toDataURL('image/png')

  const link = document.createElement('a')
  link.download = `Prototype-45-${generateHash()}.png`
  link.href = imageData
  link.click()
  link.remove()

  canvas.remove()
}

document.addEventListener('DOMContentLoaded', () => {
  init().then(() => {
    new p5(sketch)
  })
})
