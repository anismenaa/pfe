import express, {Request, Response} from 'express'
// get the model
import { Item } from '../models/item'
import { BonEntree } from '../models/bonEntree'
import { body } from 'express-validator'
import { BRError, currentUser, natsWrapper, requireAuth, validateRequest } from '@anismenaapfeesi/common-api'
import { ItemAchatCreatedPublisher } from '../events/ItemAchat-created-publisher'


const router = express.Router()

router.post('/api/achats/item/create/:bonEntree',[
  body('name')
    .isString()
    .withMessage('name of the item must be valid'),
  body('quantity')
    .isInt()
    .withMessage('quantity of the item must be valid'),
  body('prix_unitaire')
    .isInt()
    .withMessage('prix unitaire must be valid')
], validateRequest, currentUser, requireAuth,
async (req: Request, res: Response) => {
  
  // see if the user is in the supply departement
  if (req.currentUser?.authorization != 6) {
    throw new BRError('you are not authorized to create an item')
  }
  // get the informations
  const bonEntreeId = req.params.bonEntree
  
  const {name, quantity, prix_unitaire} = req.body
  
  // check for the demandeId
  const bonEntreeExist = await BonEntree.findById(bonEntreeId)

  if(!bonEntreeExist) {
    throw new BRError('bon entree with this id does not exist')
  }

  if(bonEntreeExist.validate_BE === true) {
    throw new BRError('bon entree is validated, you can not add items')
  }

  // calcul du prix total 
  const prix_total: number = prix_unitaire*quantity

  const newItem = Item.build({
    bonEntreeId: bonEntreeId,
    name: name,
    quantity: quantity,
    prix_unitaire: prix_unitaire,
    prix_total: prix_total
  })

  // we save and then publish the ItemAchat:created 
  await newItem.save()

  //publish 
 try {
   new ItemAchatCreatedPublisher(natsWrapper.client).publish({
    id: newItem._id,
    bonEntreeId: newItem.bonEntreeId,
    name: newItem.name,
    quantity: newItem.quantity,
   })
   res.status(201).send(newItem) 
 } catch (error) {
    console.log(error)
 }


})



export {router as itemCreateRouter}