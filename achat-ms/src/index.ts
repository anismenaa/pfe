import express from 'express'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import {errorHandler, natsWrapper, NotFoundError } from '@anismenaapfeesi/common-api'
import "express-async-errors"
import mongoose from 'mongoose'
//routes
import { createBonEntree } from './routes/bon-entree-create'
import { deleteBonEntree } from './routes/bon-entree-delete'
import { getAllBonEntrees } from './routes/get-all-bonEntree'
import { getOneBonEntrees } from './routes/get-one-bonEntree'
import { itemCreateRouter } from './routes/item-create'
import { itemDelete } from './routes/item-delete'
import { itemGetOne } from './routes/item-get-one'
import { getAllItems } from './routes/get-item-bonEntree'
import { BonEntreeValidated } from './routes/validate-bon-entree'
import { getAllBonEntreesToValidate } from './routes/be-to-validate'
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

// routes
app.use(createBonEntree)
app.use(deleteBonEntree)
app.use(BonEntreeValidated)
app.use(getAllBonEntrees)
app.use(getOneBonEntrees)
app.use(getAllBonEntreesToValidate)

app.use(itemCreateRouter)
app.use(itemDelete)
app.use(itemGetOne)
app.use(getAllItems)

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
    await natsWrapper.connect('pfe', 'achat-ms', 'http://nats-streaming-server-srv:4222')

    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed')
      process.exit()
    }) 

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())


    await mongoose.connect('mongodb+srv://iamanismenaa:03031999@cluster0.21ubyg6.mongodb.net/achat-db?retryWrites=true&w=majority')
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