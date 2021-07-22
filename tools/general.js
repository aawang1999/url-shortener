function getRandomIndex(arr) {
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

function getShortUrl(len) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = lowercase.toUpperCase()
  const numbers = '1234567890'
  let allSymbols = lowercase + uppercase + numbers
  let shortUrl = ''

  for (let i = 0; i < len; i++) {
    shortUrl += getRandomIndex(allSymbols)
  }

  return shortUrl
}

module.exports = getShortUrl