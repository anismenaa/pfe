import express from 'express'
import mongoose from 'mongoose'
import {json} from 'body-parser'
import cookieSession from 'cookie-session'

import {natsWrapper, errorHandler} from '@anismenaapfeesi/common-api'
//listeners
import { DemandeCreatedListener } from './events/demande-created-listener'
import { DemandefinalisedListener } from './events/demande-finalised-listener'
import { ItemCreatedListener } from './events/item-created-listener'
//routers
import { validateDemandeRouter } from './routes/validate-demande'


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

//routes
app.use(validateDemandeRouter)

app.use(errorHandler)

// connection to mongoose 
const start = async () => {

  //check for the env variable if it is defined
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined' )
  }

  try {
    await natsWrapper.connect('pfe', 'validation-ms', 'http://nats-streaming-server-srv:4222')

    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed')
      process.exit()
    }) 

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())

    new DemandeCreatedListener(natsWrapper.client).listen()
    new DemandefinalisedListener(natsWrapper.client).listen()
    new ItemCreatedListener(natsWrapper.client).listen()

    await mongoose.connect('mongodb+srv://iamanismenaa:03031999@cluster0.21ubyg6.mongodb.net/validation-db?retryWrites=true&w=majority')
    console.log('connected to mongodb:auth-db')
  } catch (error) {
    console.log(error)
  }
}

app.listen(port, () =>{
  console.log(`listening on : ${port}`)
})

start()