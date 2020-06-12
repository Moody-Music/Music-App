const router = require('express').Router()

const songRouter = require('./song')
const giphyRouter = require('./giphy')
const moodRouter = require('./mood')
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-signin', UserController.googleUser)
router.use('/songs', songRouter)
router.use('/giphy', giphyRouter)
router.use('/moods', moodRouter)

module.exports = router;