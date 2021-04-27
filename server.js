const express = require('express')
const authRoute = require('./routes/auth')
const mongosose = require('mongoose')

require('dotenv/config')


const app = express();


//connect to db
mongosose.connect(process.env.DB_URL,{ useNewUrlParser: true }, ()=>{
    console.log('connected to db')
})

app.use(express.json())

app.use('/api/user', authRoute)

app.listen(3001, ()=> {console.log('server is up and running')})