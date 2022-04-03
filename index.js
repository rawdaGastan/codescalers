require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors =  require('cors')

// Require Router Handlers
const passwords = require('./Routes/api/Password')

const app = express()
app.use(cors()) 


const {
  PORT = 7000,
  MONGO_DNS_SRV,
  MONGO_AUTH,
  MONGO_CLUSTER,
  MONGO_DB_NAME,
  MONGO_OPTIONS
} = process.env

  
mongoose.connect(`${MONGO_DNS_SRV}${MONGO_AUTH}${MONGO_CLUSTER}${MONGO_DB_NAME}${MONGO_OPTIONS}`, {
    useNewUrlParser: true
})
  
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.sendFile('passwords.html', { root: __dirname })
})

app.use('/api/passwords', passwords)

app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))