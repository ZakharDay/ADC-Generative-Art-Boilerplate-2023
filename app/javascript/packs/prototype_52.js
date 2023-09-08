const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
let price = 0

async function logJSONData() {
  const response = await fetch(url)
  const jsonData = await response.json()
  price = jsonData.price

  console.log(jsonData)
}

function updateData() {
  const dataElement = document.getElementById('data')

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  dataElement.innerText = USDollar.format(price)
}

function init() {
  const dataElement = document.createElement('div')
  dataElement.id = 'data'
  document.getElementById('prototype_52').appendChild(dataElement)
}

document.addEventListener('DOMContentLoaded', () => {
  init()

  setInterval(() => {
    logJSONData()
    updateData()
  }, 1000)
})
