import { BRError, currentUser, natsWrapper, requireAuth } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import 'express-async-errors'
import { ItemDeletedPublisher } from '../events/ItemDeletedPublisher'

// get the model
import {Item} from '../model/item'
import { Demande } from '../model/demande'

const router = express.Router()

router.delete('/api/items/:itemId', currentUser, requireAuth, async (req: Request, res: Response) => {
  // get the params 
  const itemId = req.params.itemId

  const itemExists = await Item.findById({_id: itemId})

    // check for the demandeId
    const demandeId = itemExists?.demandeId
    const demandeExist = await Demande.findById(demandeId)

    if(!demandeExist) {
      return res.status(401).send('demande does not exist')
    }
  
    if (demandeExist!.finalised === true) {
      return res.status(401).send('demande is finalised, you cant delete items')
    }
  if (!itemExists) {
    res.status(401).send('item does not exist')
  }
  await Item.deleteOne({id: itemId})
    .then(()=>{
      // publish an item:delete event
      try {
        new ItemDeletedPublisher(natsWrapper.client).publish({
         id: itemId
        })
        res.status(201).send("item deleted successfully")
      } catch (error) {
         console.log(error)
         throw new BRError('error while publishing item:deleted')
      }

      
    })
    .catch(err => {
      res.status(401).send("and error was occured while deleting an item")
    })
})

export {router as itemDelete}