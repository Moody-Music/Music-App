const router = require('express').Router()
const SongController = require('../controllers/SongController')

router.get('/:mood', SongController.songByMood)

module.exports = router