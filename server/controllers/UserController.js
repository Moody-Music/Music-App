const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { OAuth2Client } = require('google-auth-library');       //google proced
const client = new OAuth2Client(process.env.CLIENT_ID);      //google proced

class UserController {

    static register(req, res, next){

    }

    static login(req, res, next){
    
    }

    static googleUser(req, res, next) {
        const token = req.body.id_token
        let recent_email = null

        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            recent_email = payload.email;
            return User.findOne({
                where: { email: recent_email }
            })
        })
        .then( isUser => {
            if (isUser) {
                const access_token = jwt.sign( {id: isUser.id, email: isUser.email}, process.env.SECRET)
                res.status(200).json({ 
                    email: isUser.email,
                    access_token 
                })
                return
            } else { 
                return User.create({
                    email: recent_email,
                    password: 'randomPassword'
                })
            }
        })
        .then(newUser =>{
            const access_token = jwt.sign( {id: newUser.id, email: newUser.email}, process.env.SECRET)
            res.status(200).json({
                email: newUser.email,
                access_token
            })
        })
        .catch(err => {
            res.status(500).json({ message: 'Internal Server Error', err })
        })        
    }

}

module.exports = UserController;
