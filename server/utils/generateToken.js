const jwt = require('jsonwebtoken')

function generateToken(users){

    const token = jwt.sign({email: users.email, userId: users._id}, 'secret' , {expiresIn: '24h'})
    return token
}


module.exports = {
    generateToken
}