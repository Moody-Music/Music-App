const router = require('express').Router()
const GiphyController = require('../controllers/GiphyController')

router.get('/:mood', GiphyController.getByMood)

module.exports = router