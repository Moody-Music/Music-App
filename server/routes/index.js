const router = require('express').Router()

const songRouter = require('./song')
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-signin', UserController.googleUser)
router.use('/songs', songRouter)

module.exports = router;