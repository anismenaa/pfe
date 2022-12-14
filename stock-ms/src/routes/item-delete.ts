import { BRError, currentUser, natsWrapper, requireAuth } from '@anismenaapfeesi/common-api'
import express from 'express'
import { ItemBsDeletedPublisher } from '../events/itemBs-deleted-publisher'
import { BonSortie } from '../models/bonSortie'
import { ItemBs } from '../models/itemSortie'

const router = express.Router()


router.delete('/api/stock/items/delete/:id', currentUser, requireAuth,
async(req, res) => {
  // check for the authorization
  if (req.currentUser?.authorization != 4) {
    throw new BRError('you are not authorized to add item to this bon sortie')
  }

  //get the id
  const itemId = req.params.id  
  // check for the existence
  const itemExist = await ItemBs.findById(itemId)
  if (!itemExist) {
    throw new BRError('item does not exist')
  }

  const bs = await BonSortie.findById(itemExist.bonSortieId)
  if (bs && bs.finalised) {
    throw new BRError('you can not delete this item, it is finalised')
  }

  await itemExist.delete()
    .then(() => {
      new ItemBsDeletedPublisher(natsWrapper.client).publish({
        id: itemExist.id
      })
      
      res.status(201).send(`item ${itemId} is deleted`)
    })
    .catch(()=>{
      throw new BRError('an error required while deleting the item')
    })
  
})



export { router as itemDelete }