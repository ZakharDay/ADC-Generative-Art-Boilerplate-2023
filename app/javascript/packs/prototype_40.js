import p5 from 'p5'
import { getRandomArbitrary } from '../prototypes/utilities'

const cells = 10
const canvasSize = 600
const cellSize = canvasSize / cells

const color = true

let weight = 0
let r = 0
let g = 0
let b = 0

function drawTile(p, xMin, xMax, yMin, yMax) {
  const xCenter = xMax - cellSize / 2
  const yCenter = yMax - cellSize / 2

  weight = getRandomArbitrary(0, 40)

  if (color) {
    r = getRandomArbitrary(0, 255)
    g = getRandomArbitrary(0, 255)
    b = getRandomArbitrary(0, 255)

    p.stroke(r, g, b)
  }

  p.strokeWeight(weight)
  p.point(xCenter, yCenter)
}

function drawTiles(p) {
  p.background(0)

  for (let row = 0; row < cells; row++) {
    for (let column = 0; column < cells; column++) {
      drawTile(
        p,
        column * cellSize,
        (column + 1) * cellSize,
        row * cellSize,
        (row + 1) * cellSize
      )
    }
  }
}

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(canvasSize, canvasSize)
    canvas.parent('prototype_40')
    p.frameRate(6)
    p.stroke(121, 255, 57)
  }

  p.draw = () => {
    drawTiles(p)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new p5(sketch)
})
