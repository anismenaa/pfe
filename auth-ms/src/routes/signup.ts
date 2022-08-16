import express, {Request, Response} from 'express'
import { body} from 'express-validator'
import jwt from 'jsonwebtoken'
import { validateRequest } from '@anismenaapfeesi/common-api'
import { BRError } from '@anismenaapfeesi/common-api'
import { User } from '../model/user'



const router = express.Router()

// let's create the user object

router.post('/api/users/signup', [
  body('departementId')
    .isString()
    .withMessage('departementId must be valid'),
  body('authorization')
    .isInt()
    .withMessage('authorization must be valid'),
  body('name')
    .isString()
    .isLength({min:1, max: 40})
    .withMessage('name must be valid'),
  body('surname')
    .isString()
    .isLength({min:1, max: 40})
    .withMessage('surname must be valid'),
  body('email')
    .isEmail()
    .withMessage('email must be valid'),
  body('password')
    .isString()
    .isLength({min: 4, max: 20})
    .withMessage('password must be valid')
], validateRequest, 
async (req: Request, res: Response) => {
  //set the new user
  const {departementId, authorization, name, surname, email, password} = req.body

  //check if the user already defined
  const existingUser = await User.findOne({email})

  if(existingUser) {
    throw new BRError('email already in use')
  
  }

  const user = User.build({departementId, authorization, name, surname, email, password})
  // we save the user in the auth-db/users
  await user.save()
  
  // genreate a JWT
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_KEY!)
  
  req.session = {
    jwt: userJwt
  }

  res.status(201).send(user)
})

export {router as signUpRouter}
