import { getRandomArbitrary } from '../prototypes/utilities'

const colorURL = 'http://colormind.io/api/'
const colorData = { model: 'default' }

function updatePalette(data) {
  const container = document.getElementById('container')

  container.childNodes.forEach((colorElement, index) => {
    const color = data[index]
    colorElement.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
  })
}

async function getNoise(color) {
  const response = await fetch(
    `https://php-noise.com/noise.php?r=${color[0]}&g=${color[1]}&b=${color[2]}&json`
  )

  const jsonData = await response.json()

  document.body.style.backgroundImage = `url(${jsonData.uri})`
}

function initButton() {
  const button = document.createElement('div')
  button.id = 'button'
  button.innerText = 'Generate Palette'

  button.addEventListener('click', () => {
    fetch(colorURL, {
      method: 'POST',
      body: JSON.stringify(colorData)
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data)
        updatePalette(data.result)
        getNoise(data.result[Math.floor(getRandomArbitrary(0, 4))])
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })

  document.getElementById('prototype_53').appendChild(button)
}

function initPalette() {
  const container = document.createElement('div')
  container.id = 'container'

  for (let index = 0; index < 5; index++) {
    const color = document.createElement('div')
    container.appendChild(color)
  }

  document.getElementById('prototype_53').appendChild(container)
}

document.addEventListener('DOMContentLoaded', () => {
  initPalette()
  initButton()
})
