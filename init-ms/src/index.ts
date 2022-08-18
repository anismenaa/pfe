import express from 'express'
import { errorHandler, currentUser, natsWrapper, NotFoundError } from '@anismenaapfeesi/common-api'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import { json } from 'body-parser'
import 'express-async-errors'
//routes
import {departementCreateRouter} from './routes/departement-create'
import { departementGetAllRouter } from './routes/departement-get-all'

const port = 3000

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false, //no encryption
    secure: true // we must be on the https connection
  })
)

app.use(currentUser)

//routes
app.use(departementCreateRouter)
app.use(departementGetAllRouter)

// for not found pages (must be before errorHandler)
app.all('*', async (req, res, next) => {
  next(new NotFoundError()) 
})


// middlewares
app.use(errorHandler)

const start = async () => {
  //check for the env variable if it is defined
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
  // connection to mongodd
  try {
    await natsWrapper.connect('pfe', 'init-ms', 'http://nats-streaming-server-srv:4222')
    
    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed')
      process.exit()
    })

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())

    await mongoose.connect('mongodb+srv://iamanismenaa:03031999@cluster0.21ubyg6.mongodb.net/init-db?retryWrites=true&w=majority')
    console.log('connected to mongodb:init-db')
  } catch (error) {
    console.log(error)
  }
}

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

start()