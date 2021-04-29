const router = require('express').Router()
const User = require('../models/User')
const {registerValidation, loginValidation} = require('../Validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv/config')

router.post('/register', async (req,res) => {

    const {error} = registerValidation(req.body)

    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email})

    if(emailExist) return res.status(400).send('email already exists')


    //hash passowrd

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try{
        const savedUser = await user.save();
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
        //res.send({message: err})
    }
})

router.post('/login', async (req,res)=> {
    
    const {error} = loginValidation(req.body)

    if(error) return res.send(error.details[0].message);

    const user = await User.findOne({email: req.body.email})

    if(!user) return res.status(400).send('user doesnt exists')

    //password check
    const validPass = await bcrypt.compare(req.body.password, user.password)

    if(!validPass) return res.status(400).send('Invalid password')

    //generating and returning a jwt token

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    res.header('auth-token', token).send(token)

    res.send('Logged IN')
})

module.exports = router;