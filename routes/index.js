const express = require('express')
const router = express.Router()
const getShortUrl = require('../tools/general')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  res.render('success', { url: req.body.url, shortUrl: getShortUrl(5) })
})

module.exports = router