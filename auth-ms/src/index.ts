import express from 'express'
import { json } from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import 'express-async-errors'
//routes
import { signUpRouter } from './routes/signup'
import { currentuserRouter } from './routes/currentUser'
import {errorHandler, NotFoundError, natsWrapper} from '@anismenaapfeesi/common-api'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { DepartementCreatedListener } from './events/listeners/departement-created-listener'

// definition du port 
const port = 3000

const app = express()
// to make express aware of ingress nginx
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false, //no encryption
    secure: true // we must be on the https connection
  })
)
//use routes
app.use(signUpRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(currentuserRouter)

// for not found pages (must be before errorHandler)
app.all('*', async (req, res, next) => {
  next(new NotFoundError()) 
})


app.use(errorHandler)

// connection to mongoose 
const start = async () => {

  //check for the env variable if it is defined
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined' )
  }

  try {
    await natsWrapper.connect('pfe', 'auth-ms', 'http://nats-streaming-server-srv:4222')

    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed')
      process.exit()
    }) 

    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())

    new DepartementCreatedListener(natsWrapper.client).listen()

    await mongoose.connect('mongodb+srv://iamanismenaa:03031999@cluster0.21ubyg6.mongodb.net/auth-db?retryWrites=true&w=majority')
    console.log('connected to mongodb:auth-db')
  } catch (error) {
    console.log(error)
  }
}

app.listen(port, () => {
  console.log(`listening on : ${port}`)
})

start()
