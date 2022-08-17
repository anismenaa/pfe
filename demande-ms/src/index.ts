import express from 'express'
import mongoose from 'mongoose'
import "express-async-errors"
import cookieSession from 'cookie-session'
import { json } from 'body-parser'
import {natsWrapper, errorHandler} from '@anismenaapfeesi/common-api'

import { demandeCreateRouter } from './routes/demande-create'
import { demandeGetAllRouter } from './routes/demande-get-all'
import { demandeGetOneRouter } from './routes/demande-get-one'

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

app.use(errorHandler)

//routes
app.use(demandeCreateRouter)
app.use(demandeGetAllRouter)
app.use(demandeGetOneRouter)


const start = async () => {

  //check for the env variable if it is defined
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined' )
  }

  // connection to mongodb
  try {
    await natsWrapper.connect('pfe', 'demande_publisher', 'http://nats-streaming-server-srv:4222')

    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed')
      process.exit()
    }) 

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())


    await mongoose.connect('mongodb+srv://iamanismenaa:03031999@cluster0.21ubyg6.mongodb.net/demande-db?retryWrites=true&w=majority')
    console.log('connected to mongodb:demande-db')
  } catch (error) {
    console.log(error)
  }
}

app.listen(port, () => {
  console.log(`listening on : ${port}`)
})

start()