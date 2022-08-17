import express, {Request, Response} from 'express'
import  { body } from 'express-validator'
import 'express-async-errors'
import { validateRequest, BRError, requireAuth, natsWrapper } from '@anismenaapfeesi/common-api'

import { Departement } from '../model/departement'
import { DepartementCreatedPublisher } from '../events/publishers/departement-created-publisher'


const router = express.Router()

router.post('/api/departements/create',[
  body('name')
    .isString()
    .withMessage('departement name must be valid')
], validateRequest, requireAuth,
async (req: Request, res: Response) => {
  // only the admin who can do this 
  if(req.currentUser?.authorization===1) {
    const { name } = req.body
    // verify if this departement does not exist
    const departementExist =await Departement.findOne({name})
    
    if (departementExist) {
      throw new BRError('departement already exists')
    }

    // we create a departement
    const departement = Departement.build({name})
    await departement.save()

    try {
          // after we save we publish an event departement:created
      new DepartementCreatedPublisher(natsWrapper.client).publish({
        id: departement.id,
        name: departement.name
      })

      res.status(201).send(departement)

    } catch (error) {
      console.log(error) 
    }

    } else {
      throw new BRError('this is handled only by admins')
    }

   
})

export { router as departementCreateRouter }