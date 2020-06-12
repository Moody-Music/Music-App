const router = require('express').Router()
const MoodController = require('../controllers/MoodController')

router.get('/', MoodController.getAll)

module.exports = router