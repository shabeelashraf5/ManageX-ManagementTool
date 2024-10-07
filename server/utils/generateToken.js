const jwt = require('jsonwebtoken')

function generateToken(users){

    const token = jwt.sign({email: users.email}, 'secret' , {expiresIn: '24h'})
    return token
}


module.exports = {
    generateToken
}