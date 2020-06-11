const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { OAuth2Client } = require('google-auth-library');       //google proced
const client = new OAuth2Client(process.env.CLIENT_ID);      //google proced

class UserController {
    
    static register(req, res, next){
        let newUser = {
            email:req.body.email,
            password:req.body.password            
        }
      
        User.create(newUser)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static login(req, res, next){
        let dataUser = {
            email:req.body.email,
            password:req.body.password
        }
          
        User.findOne({ where: {email:dataUser.email } } )
        .then(data =>{
            if(!data) {
                next({name:"USER_NOT_FOUND"})
            } else{
                if(bcrypt.compareSync(req.body.password, data.password)){
                let token = jwt.sign({id:data.id,email:data.email}, process.env.SECRET);
                res.status(200).json({id:data.id,email:data.email,token:token})
                } else{
                    next({name:"USER_NOT_FOUND", message:"invalid email / password"})
                }
            }
        })
        .catch(err =>{
            next(err)
        })
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
            next(err)
        })        
    }

}

module.exports = UserController;
