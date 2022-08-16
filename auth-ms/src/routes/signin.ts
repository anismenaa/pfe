import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt  from 'jsonwebtoken';

import { validateRequest, BRError} from '@anismenaapfeesi/common-api'

import { User } from "../model/user";
import { Password } from '../services/password';

const router = express.Router()

router.post('/api/users/signin', 
[
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
],
validateRequest,
async (req: Request, res: Response) => {
  const {email, password} = req.body

  const existingUser = await User.findOne({email})
  if (!existingUser) {
    throw new BRError('Invalid Credentials')
  }

  const passwordsMatch = await Password.compare(existingUser.password, password)
  if (!passwordsMatch) {
    throw new BRError('Invalid Credentials')
  }

  // generate jwt
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY!) // it is a secret private key

  //store the jwt on session object
  req.session = {
    jwt: userJwt
  }

  res.status(201).send(existingUser)

})

export {router as signinRouter}