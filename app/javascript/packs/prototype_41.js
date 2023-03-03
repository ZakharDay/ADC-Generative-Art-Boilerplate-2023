import p5 from 'p5'
import { getRandomArbitrary } from '../prototypes/utilities'

const canvasSize = 600

const shift = false
const enthropy = true
const effect = true

const shiftSize = {
  x: 0,
  y: 0
}

let shiftSeed = 5
let cells = 30
let cellSize = calcCellSize()

let xCenter, yCenter

function calcCellSize() {
  return canvasSize / cells
}

function drawTile(p, row, column) {
  if (effect) {
    const weight = getRandomArbitrary(0, 4)
    p.strokeWeight(weight)
  }

  if (enthropy) {
    shiftSeed = (row + column) / 8
  }

  if (shift) {
    const s = getRandomArbitrary(-shiftSeed, shiftSeed)
    shiftSize.x = s
    shiftSize.y = s
  } else {
    shiftSize.y = getRandomArbitrary(-shiftSeed, shiftSeed)
  }

  xCenter = (column + 1) * cellSize - cellSize / 2 + shiftSize.x
  yCenter = (row + 1) * cellSize - cellSize / 2 + shiftSize.y

  if (column === 0) {
    p.beginShape()
    p.vertex(xCenter, yCenter)
  } else {
    p.bezierVertex(xCenter, yCenter, xCenter, yCenter, xCenter, yCenter)
  }

  if (column === cells - 1) {
    p.endShape()
  }
}

function drawTiles(p) {
  p.background(0)

  if (effect) {
    cells = Math.floor(getRandomArbitrary(30, 120))
    cellSize = calcCellSize()
  }

  for (let row = 0; row < cells; row++) {
    for (let column = 0; column < cells; column++) {
      drawTile(p, row, column)
    }
  }
}

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(canvasSize, canvasSize)
    canvas.parent('prototype_41')
    p.frameRate(6)
    p.stroke(121, 255, 57)
    p.noFill()
    // p.fill(141)
  }

  p.draw = () => {
    drawTiles(p)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new p5(sketch)
})
