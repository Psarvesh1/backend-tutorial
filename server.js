const express = require('express')
const authRoute = require('./routes/auth')
const mongosose = require('mongoose')
const postRoute = require('./routes/post')
const cors = require('cors')
require('dotenv/config')


const app = express();


//connect to db

mongosose.connect(process.env.DB_URL,{ useNewUrlParser: true }, ()=>{
    console.log('connected to db')
})

app.use(express.json())

app.use(cors())

app.use('/api/user', authRoute)

app.use('/api/user', postRoute)

app.listen(3001, ()=> {console.log('server is up and running')})