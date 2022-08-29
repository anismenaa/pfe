import express from 'express'
import mongoose from 'mongoose'
import "express-async-errors"
import cookieSession from 'cookie-session'
import { json } from 'body-parser'
import {natsWrapper, errorHandler, NotFoundError} from '@anismenaapfeesi/common-api'
//demandes
import { demandeCreateRouter } from './routes/demande-create'
import { demandeGetAllRouter } from './routes/demande-get-all'
import { demandeGetOneRouter } from './routes/demande-get-one'
import { demandeUpdatedRouter } from './routes/demande-update'
import { getDemandesDep } from './routes/director/demande-get-all'
import { toValidate } from './routes/demande-get-all-notValidated'
//items
import { ItemCreateRouter } from './routes/item-create'
import { itemsOfDemandeRouter } from './routes/items-of-demande'
import { itemDelete } from './routes/item-delete'
import { DemandeValidated1Listener } from './events/demande-validated1-listener'
import { DemandeValidated2Listener } from './events/demande-validated2-listener'

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



//routes demandes
app.use(demandeCreateRouter)
app.use(demandeGetAllRouter)
app.use(demandeGetOneRouter)
app.use(demandeUpdatedRouter)
app.use(getDemandesDep)
app.use(toValidate)
//routes items
app.use(ItemCreateRouter)
app.use(itemsOfDemandeRouter)
app.use(itemDelete)


// for not found pages (must be before errorHandler)
app.all('*', async (req, res, next) => {
  next(new NotFoundError()) 
})


app.use(errorHandler)

const start = async () => {

  //check for the env variable if it is defined
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined' )
  }

  // connection to mongodb
  try {
    await natsWrapper.connect('pfe', 'demande-ms', 'http://nats-streaming-server-srv:4222')

    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed')
      process.exit()
    }) 

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())

    new DemandeValidated1Listener(natsWrapper.client).listen()
    new DemandeValidated2Listener(natsWrapper.client).listen()

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