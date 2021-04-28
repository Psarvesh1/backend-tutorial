const jwt = require('jsonwebtoken')
require('dotenv/config')


const auth = (req,res,next) => {
    
    const token = req.header('auth-token')

    if(!token) return res.status(400).send('Access Denied')

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET )
        req.user = verified;
        next()
    }catch(error){
        res.status(400).send('Invalid token')
    }
}

module.exports = auth;