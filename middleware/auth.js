const jwt = require('jsonwebtoken')
const { BadRequest, UnauthenticatedError } = require('../errors/index')

const authorizationMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization

    if( !authHeader || !authHeader.startsWith("Bearer ")){
        throw new UnauthenticatedError("No Token Provided")
    }

    const token = authHeader.split(" ")[1]
    try{
        const decoded = jwt.verify(token, process.env.JWT_Secret)
        const {id, username} = decoded
        req.user = {id, username}
    } catch(error){
        throw new UnauthenticatedError("Not authorised to access this route")
    }

    next()
}

module.exports = authorizationMiddleware