const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, process.env.JWT_CODE );
        req.userData = decoded;
        next();
      } else {
        throw new Error('Authorization header not found');
      }
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  }

module.exports = verifyToken
