import p5 from 'p5'

const min = 100
const max = 300
const step = 1
const radius = 180
let coordinates = min
let direction = 'up'
let shiftX, shiftY, x, y

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(600, 600)
    canvas.parent('prototype_48')
  }

  p.draw = () => {
    if (direction === 'up') {
      if (coordinates >= min && coordinates < max) {
        coordinates += step
      } else if (coordinates >= max) {
        direction = 'down'
      }
    } else if (direction === 'down') {
      if (coordinates <= max && coordinates > min) {
        coordinates -= step
      } else if (coordinates <= min) {
        direction = 'up'
      }
    }

    // console.log(coordinates, direction)

    shiftX = coordinates
    shiftY = coordinates
    x = shiftX + radius / 2
    y = shiftY + radius / 2

    p.background(0)
    p.fill(255, 100, 150)
    p.ellipse(x, y, radius, radius)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new p5(sketch)
})
