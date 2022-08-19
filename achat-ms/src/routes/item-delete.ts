import { BRError, currentUser, natsWrapper, requireAuth } from '@anismenaapfeesi/common-api'
import express, {Request, Response} from 'express'
import 'express-async-errors'
import { ItemAchatDeletedPublisher } from '../events/ItemAchat-deteleted-publisher'

// get the model
import {Item} from '../models/item'

const router = express.Router()

router.delete('/api/achats/item/delete/:itemId', currentUser, requireAuth, async (req: Request, res: Response) => {
  // get the params 
  if (req.currentUser?.authorization != 6) {
    throw new BRError('you are not authorized to delete an item')
  }
  const itemId = req.params.itemId

  const itemExists = await Item.findById(itemId)
  if (!itemExists) {
    throw new BRError('item does not exist')
  }
  await itemExists.deleteOne({_id: itemId})
    .then(()=>{
      // publish an item:delete event
      try {
        new ItemAchatDeletedPublisher(natsWrapper.client).publish({
         id: itemId
        })
        res.status(201).send("item deleted successfully") 
      } catch (error) {
         console.log(error)
         throw new BRError('error while publishing item:deleted')
      }

      
    })
    .catch(() => {
      res.status(401).send("and error was occured while deleting an item")
    })
})

export {router as itemDelete}