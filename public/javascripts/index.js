const shortUrl = document.querySelector('#short-url')
const copyUrl = document.querySelector('#copy-url')

shortUrl.innerText = document.URL + shortUrl.innerText

copyUrl.addEventListener('click', async () => {
  await navigator.clipboard.writeText(shortUrl.innerText)
})