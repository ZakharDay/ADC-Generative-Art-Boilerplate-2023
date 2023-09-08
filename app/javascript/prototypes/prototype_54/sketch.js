import p5 from 'p5'
import { getRandomArbitrary } from '../utilities'
import {
  getStoreShift,
  getStoreEnthropy,
  getStoreEffect,
  setStoreShift,
  setStoreEnthropy,
  setStoreEffect
} from './store'

const canvasSize = {
  width: 2000,
  height: 1000
}

const shiftSize = {
  x: 0,
  y: 0
}

let canvasContainerId = ''

let shiftSeed = 5
let cells = 100
let cellSize = calcCellSize()

let xCenter, yCenter

function handleKeyPress(e) {
  console.log(e.keyCode)

  //  1  2  3  4  5  6  7  8  9  0
  // 49 50 51 52 53 54 55 56 57 48

  //   q   w   e   r   t   y   u   i   o   p  [  ]  \
  // 113 119 101 114 116 121 117 105 111 112 91 93 92

  switch (e.keyCode) {
    case 49:
      // amplitude
      setStoreShift(false)
      break
    case 50:
      // amplitude
      setStoreShift(true)
      break

    case 51:
      // weight
      setStoreEnthropy(false)
      break
    case 52:
      // weight
      setStoreEnthropy(true)
      break

    case 53:
      // red
      setStoreEffect(false)
      break
    case 54:
      // red
      setStoreEffect(true)
      break

    case 55:
      // green
      if (laserSensorsData[3] > 0) {
        laserSensorsData[3] -= 1
      }
      break
    case 56:
      // green
      if (laserSensorsData[3] < 255) {
        laserSensorsData[3] += 1
      }
      break

    case 57:
      // blue
      if (laserSensorsData[4] > 0) {
        laserSensorsData[4] -= 1
      }
      break
    case 48:
      // blue
      if (laserSensorsData[4] < 255) {
        laserSensorsData[4] += 1
      }
      break
  }
}

document.addEventListener('keypress', (e) => {
  handleKeyPress(e)
})

function calcCellSize() {
  return canvasSize.width / cells
}

function drawTile(p, row, column) {
  if (getStoreEffect()) {
    const weight = getRandomArbitrary(0, 4)
    p.strokeWeight(weight)
  }

  if (getStoreEnthropy()) {
    shiftSeed = (row + column) / 8
  }

  if (getStoreShift()) {
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

  if (getStoreEffect()) {
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
    // const canvas = p.createCanvas(canvasSize, canvasSize)
    const canvas = p.createCanvas(canvasSize.width, canvasSize.height)
    canvas.parent(canvasContainerId)
    p.frameRate(6)
    p.stroke(121, 255, 57)
    p.noFill()
    // p.fill(141)
  }

  p.draw = () => {
    drawTiles(p)
  }
}

function initSketch(id) {
  canvasContainerId = id
  canvasSize.width = window.innerWidth
  canvasSize.height = window.innerHeight
  new p5(sketch)
}

export { initSketch }
