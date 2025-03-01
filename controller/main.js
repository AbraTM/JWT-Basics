const jwt = require('jsonwebtoken')
const { BadRequest } = require('../errors')


const login = async(req, res) => {
    const { username, password } = req.body
    if( !username || !password){
        throw new BadRequest('Please provide email and password.')
    }

    const id = new Date().getDate()
    const token = jwt.sign({id, username}, process.env.JWT_Secret, {expiresIn: '30d'})
    res.status(200).json({msg : "User Created", token: token})
}

const dashboard = async(req, res) => {
    res.status(200).json({ msg : `Hello, User-${req.user.username}`, secret : `Your id is ${req.user.id}` })
}

module.exports = {
    login,
    dashboard
}