import express from 'express'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import {errorHandler, natsWrapper, NotFoundError } from '@anismenaapfeesi/common-api'
import "express-async-errors"
import mongoose from 'mongoose'

import { BonEntreeCreatedListener } from './events/bonEntree-created-listener'
import { ItemAchatCreatedListener } from './events/itemAchat-created-listener'
import { BonEntreeDeletedListener } from './events/bonEntree-deleted-listener'
import { ItemAchatDeletedListener } from './events/itemAchat-deleted-listener'

//routes
import { getAllBonEntrees } from './routes/get-all-bonEntree'
import { getAllItems } from './routes/get-all-items-bonEntree'
import { getOneBonEntrees } from './routes/get-one-bonEntree'
import { getItems } from './routes/get-al-items'
import { bonSortieCreate } from './routes/bon-sortie-create'
import { bonSortieDeleted } from './routes/bon-sortie-delete'
import { bonSortieGetAll } from './routes/get-all-bon-sortie'
import { bonSortieGetOne } from './routes/get-one-bon-sortie'
import { bonSortieFinalisation } from './routes/bon-sortie-finalise'
import { itemCreateBs } from './routes/item-create'
import { itemGetAllForBs } from './routes/item-getAll-bonSortie'
import { itemDelete } from './routes/item-delete'

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

app.use(getAllBonEntrees)
app.use(getAllItems)
app.use(getOneBonEntrees)
app.use(getItems)
//bon-sortie
app.use(bonSortieCreate)
app.use(bonSortieDeleted)
app.use(bonSortieGetAll)
app.use(bonSortieGetOne)
app.use(bonSortieFinalisation)

app.use(itemCreateBs)
app.use(itemGetAllForBs)
app.use(itemDelete)

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
    await natsWrapper.connect('pfe', 'stock-ms', 'http://nats-streaming-server-srv:4222')

    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed')
      process.exit()
    }) 

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())

    new BonEntreeCreatedListener(natsWrapper.client).listen()
    new BonEntreeDeletedListener(natsWrapper.client).listen()
    new ItemAchatCreatedListener(natsWrapper.client).listen()
    new ItemAchatDeletedListener(natsWrapper.client).listen()

    await mongoose.connect('mongodb+srv://iamanismenaa:03031999@cluster0.21ubyg6.mongodb.net/stock-db?retryWrites=true&w=majority')
    console.log('connected to mongodb:achat-db')
  } catch (error) {
    console.log(error)
  }
}




//listening
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

start()