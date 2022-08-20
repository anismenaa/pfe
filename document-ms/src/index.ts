import express from 'express'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import {errorHandler, natsWrapper, NotFoundError } from '@anismenaapfeesi/common-api'
import "express-async-errors"
import mongoose from 'mongoose'


//routes
import { demandeAchatGetAll } from './routes/demande-achat/getAll'
import { demandeAchatGetOneById } from './routes/demande-achat/getOne'
import { demandeAchatGetAllperUser } from './routes/demande-achat/getAll-per-user'

//event listener
import { DemandeCreatedListener } from './events/demande-created-listener'
import { DemandeValidated1Listener } from './events/demande-validated1-listener'
import { DemandeValidated2Listener } from './events/demande-validated2-listener'
import { DemandefinalisedListener } from './events/demande-finalised-listerner'

import { ItemCreatedListener } from './events/item-created-listener'
import { ItemDeletedListener } from './events/item-deleted-listener'

import { BonEntreeCreatedListener } from './events/bonEntree-created-listener'
import { BonEntreeDeletedListener } from './events/bonEntree-deleted-listener'
import { BonEntreeValidatedListener } from './events/bonEntree-validated-listener'

import { ItemAchatCreatedListener } from './events/itemAchat-created-listener'
import { ItemAchatDeletedListener } from './events/itemAchat-deleted-listener'
import { BonSortieCreatedListener } from './events/bonSortie-created-listener'
import { BonSortiefinalisedListener } from './events/bonSortie-finalised-listener'
import { BonSortieDeletedListener } from './events/bonSortie-deleted-listener'
import { ItemBsCreatedListener } from './events/itemBs-created-listener'
import { ItemBsDeletedListener } from './events/itemBs-deleted-listener'
import { demandeAchatGetAllperDepartement } from './routes/demande-achat/getAll-per-departement'



const port = 3000

const app = express()

//use midellwares
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false, //no encryption
    secure: true // we must be on the https connection
  })
)


app.use(demandeAchatGetAll)
app.use(demandeAchatGetOneById)
app.use(demandeAchatGetAllperUser)
app.use(demandeAchatGetAllperDepartement)

// for not found pages (must be before errorHandler)
app.all('*', async (req, res, next) => {
  next(new NotFoundError()) 
})


app.use(errorHandler)

const start = async () => {
  //check for tje JWT_KEY
  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined' )
  }
  try {
    await natsWrapper.connect('pfe', 'document-ms', 'http://nats-streaming-server-srv:4222')

    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed')
      process.exit()
    }) 

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())

    // listeners
    new DemandeCreatedListener(natsWrapper.client).listen()
    new DemandefinalisedListener(natsWrapper.client).listen()
    new DemandeValidated1Listener(natsWrapper.client).listen()
    new DemandeValidated2Listener(natsWrapper.client).listen()

    new ItemDeletedListener(natsWrapper.client).listen()
    new ItemCreatedListener(natsWrapper.client).listen()
    
    new BonEntreeCreatedListener(natsWrapper.client).listen()
    new BonEntreeDeletedListener(natsWrapper.client).listen()
    new BonEntreeValidatedListener(natsWrapper.client).listen()

    new ItemAchatCreatedListener(natsWrapper.client).listen()
    new ItemAchatDeletedListener(natsWrapper.client).listen()

    new BonSortieCreatedListener(natsWrapper.client).listen()
    new BonSortieDeletedListener(natsWrapper.client).listen()
    new BonSortiefinalisedListener(natsWrapper.client).listen()

    new ItemBsCreatedListener(natsWrapper.client).listen()
    new ItemBsDeletedListener(natsWrapper.client).listen()


    await mongoose.connect('mongodb+srv://iamanismenaa:03031999@cluster0.21ubyg6.mongodb.net/document-db?retryWrites=true&w=majority')
    console.log('connected to mongodb:document-db')
  } catch (error) {
    console.log(error)
  }
}




//listening
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

start()