import express, {Request, Response} from 'express'
import 'express-async-errors'
// get the model
import { Item } from '../model/item'
import { Demande } from '../model/demande'
import { body } from 'express-validator'
import { BRError, currentUser, natsWrapper, requireAuth } from '@anismenaapfeesi/common-api'
import { ItemCreatedPublisher } from '../events/ItemCreatedPublisher'

const router = express.Router()

router.post('/api/items/create/:demandeId',[
  body('name')
    .isString()
    .withMessage('name of the item must be valid'),
  body('quantity')
    .isInt()
    .withMessage('quantity of the item must be valid')
], currentUser, requireAuth,
async (req: Request, res: Response) => {
  // get the informations
  const demandeId = req.params.demandeId
  const {name, quantity} = req.body
  
  // check for the demandeId
  const demandeExist = await Demande.findById(demandeId)

  if(!demandeExist) {
    throw new BRError('demande does not exist')
  }

  const newItem = Item.build({
    demandeId: demandeId,
    name: name,
    quantity: quantity
  })

  // we save and then publish the Item:created 
  await newItem.save()

  //publish 
 try {
   new ItemCreatedPublisher(natsWrapper.client).publish({
    id: newItem.id,
    demandeId: newItem.demandeId,
    name: newItem.name,
    quantity: newItem.quantity
   })

   res.status(201).send(newItem)
 } catch (error) {
    console.log(error)
 }


})



export {router as ItemCreateRouter}