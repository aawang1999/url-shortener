const express = require('express')
const router = express.Router()
const getShortUrl = require('../tools/general')
const ShortUrl = require('../models/shortUrl')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:id', (req, res) => {
  ShortUrl.find({ id: req.params.id })
    .lean()
    .then(result => {
      if (result.length === 1) {
        res.redirect(result[0].url)
      } else {
        res.redirect('/')
      }
    })
    .catch(error => console.log(error))
})

router.post('/', async (req, res) => {
  const url = req.body.url

  let checkUrl = async (url) => {
    try {
      const shortUrl = await ShortUrl.find({ url }).lean().exec()
      if (shortUrl.length === 1) {
        return shortUrl[0].id
      } else {
        return false
      }
    } catch (error) {
      return 'Error.'
    }
  }

  let checkId = async (id) => {
    try {
      const findId = await ShortUrl.find({ id }).lean().exec()
      return findId.length
    } catch (error) {
      return 'Error.'
    }
  }

  let id = await checkUrl(url)

  if (id) {
    res.render('success', { url, id })
  } else {
    do {
      id = getShortUrl(5)
    } while (await checkId(id))
    ShortUrl.create({ url, id })
      .then(() => {
        return res.render('success', { url, id })
      })
      .catch(error => console.log(error))
  }
})

module.exports = router