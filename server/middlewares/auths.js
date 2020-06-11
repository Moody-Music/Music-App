const jwt = require('jsonwebtoken')
const { User } = require('../models')

const authentication = (req, res, next) => {
    const { access_token } = req.headers

    try {
        if(!access_token){ 
            res.status(400).json({ message: 'access_token not found'})
        } else {
            req.userData = jwt.verify(access_token, process.env.SECRET)
            User.findOne({
                where: { id: req.userData.id}
            })
            .then( response => {
                if (response) { 
                    next() 
                } else { console.log('User not found.') }
            })
            .catch( err => {
                console.log('authentication error')
            })
        }
    } catch (err) {
        res.status(500).json({ 
            message: err.message || 'Error authentication user'
        })
    }
}

const authorization = (req, res, next) => {
    //
}

module.exports = { authentication, authorization }