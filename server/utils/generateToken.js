const jwt = require('jsonwebtoken')

function generateToken(users){

    const token = jwt.sign({email: users.email, userId: users._id}, process.env.JWT_CODE , {expiresIn: process.env.JWT_EXPIRES })
    return token
}


module.exports = {
    generateToken
}